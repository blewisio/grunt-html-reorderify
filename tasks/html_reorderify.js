/*
 * grunt-html-reorderify
 * https://github.com/blewis008/html-reorderify
 *
 * Copyright (c) 2014 Brent Lewis
 * Licensed under the MIT license.
 */

'use strict';

var html_reorderify = module.exports = function(grunt) {
  grunt.registerMultiTask('html_reorderify', 'Reorder HTML attributes such as id, class, or style into a standard order.', function() {
    // debugger; // uncomment to debug via node-inspector
    
    var options = this.options();

    var src = this.files[0].orig.src[0];
    if (grunt.file.exists(src)) {
      src = grunt.file.read(src);
      src = html_reorderify.reorderAttributes(src, options);
      var dest = this.files[0].dest;
      grunt.file.write(dest, src);
    } else {
      grunt.log.warn('File "' + src + '" does not exist.');
    }
  });
};

html_reorderify.reorderAttributes = function(src, options) {
  var i,
      tagBeginIndex = null,
      tagEndIndex = null;

  for (i = 0; i < src.length; i++) {
    if (tagBeginIndex === null) {
      if (src[i] === '<') {
        tagBeginIndex = i;
      }
    } else if (tagEndIndex === null) {
      if (src[i] === '>') {
        tagEndIndex = i;
        if (src[i-1] === '/' && src[i-2] === ' ') {
          tagEndIndex -= 2;
        }
      }
    } else {
      var originalElement = src.substring(tagBeginIndex + 1, tagEndIndex);
      if (originalElement[0] !== '/') {
        var elementName = originalElement.substring(0, originalElement.indexOf(' ')),
            element = originalElement.substring(originalElement.indexOf(' ') + 1),
            attributes = html_reorderify.getAttributesFromElement(element);

        if (attributes.length > 1) {
          var unsortedAttributes = html_reorderify.getEachAttribute(attributes, options);
          var sortedAttributes = html_reorderify.sortAttributes(unsortedAttributes);
          var orderedElement = html_reorderify.rebuildElement(elementName, sortedAttributes);
          src = src.replace(originalElement, orderedElement);
        }
      }
      tagBeginIndex = null;
      tagEndIndex = null;
    }
  }
  return src;
};

html_reorderify.getAttributesFromElement = function(element) {
  var attributes = [],
      j,
      equalsFound,
      attributeName,
      attributeValue,
      quoteBeginIndex = null,
      quoteEndIndex = null;

  function reset() {
    equalsFound = false;
    attributeName = '';
    attributeValue = '';
  }

  reset();

  for (j = 0; j < element.length; j++) {
    var symbol = element[j];
    if (!equalsFound && symbol !== '=') {         // first get attribute name up to equals
      attributeName += symbol;
    } else if (!equalsFound && symbol === '=') {  // then mark equals
      equalsFound = true;
    } else if (!quoteBeginIndex && symbol === '"') { // then find first quote
      quoteBeginIndex = j;
      attributeValue += symbol;
    } else if (symbol === '"') {                  // then find last quote
      quoteBeginIndex = null;
      quoteEndIndex = null;
      attributeValue += symbol;
      if (j === element.length - 1) {
        attributes.push(attributeName + '=' + attributeValue);
      }
    } else if (quoteBeginIndex && !quoteEndIndex) {
      attributeValue += symbol;
    } else if (symbol === ' ') {                  // space found, move on to next attribute - DEPRECATED?
      attributes.push(attributeName + '=' + attributeValue);
      reset();
    } else if (j === element.length - 1) {        // end of element found, add final character
      attributeValue += symbol;
      attributes.push(attributeName + '=' + attributeValue);
      reset();
    } else {                                      // add to value, name and equals already found
      attributeValue += symbol;
    }
  }
  return attributes;
};

html_reorderify.getEachAttribute = function(attributes, options) {
  var keyValuePairs = [],
      k;
  for(k = 0; k < attributes.length; k++) {
    var attribute = attributes[k];
    var firstEqualsIndex = attribute.indexOf('=');
    var pair = [attribute.substring(0, firstEqualsIndex), attribute.substring(firstEqualsIndex + 1, attribute.length)];
    var obj = html_reorderify.buildSortableAttribute(pair, options, attributes.length + k);
    keyValuePairs.push(obj);
  }
  return keyValuePairs;
};

html_reorderify.sortAttributes = function(unsorted) {
  return unsorted.sort(function (a, b) {
    return a.order - b.order;
  });
};

html_reorderify.rebuildElement = function(element, keyValuePairs) {
  var m;
  for(m = 0; m < keyValuePairs.length; m++) {
    element += ' ' + keyValuePairs[m].name + '=' + keyValuePairs[m].value;
  }
  return element;
};

html_reorderify.buildSortableAttribute = function(keyValuePair, options, maxOrder) {
  return {
            'name': keyValuePair[0],
            'value': keyValuePair[1],
            'order': html_reorderify.getAttributeIndex(keyValuePair[0], maxOrder, options)
         };
};

html_reorderify.getAttributeIndex = function(attributeName, maxOrder, options) {
  var foundIndex = options.first.indexOf(attributeName);
  return foundIndex === -1 ? maxOrder : foundIndex;
};

html_reorderify.testFunction = function() {
  return 5;
};
