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
    
    var options = grunt.config.get('html_reorderify.default.options');

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
      }
    } else {
      var originalElement = src.substring(tagBeginIndex + 1, tagEndIndex);
      if (originalElement[0] !== '/') {
        var elementName = originalElement.substring(0, originalElement.indexOf(' ')),
            element = originalElement.substring(originalElement.indexOf(' ') + 1),
            attributes = element.split(' ');

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

html_reorderify.getEachAttribute = function(attributes, options) {
  var keyValuePairs = [],
      k;
  for(k = 0; k < attributes.length; k++) {
    var pair = attributes[k].split('=');
    var obj = {
                'name': pair[0],
                'value': pair[1],
                'order': options.left.indexOf(pair[0])
              };
    obj.order = obj.order === -1 ? attributes.length + k : obj.order;
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

html_reorderify.testFunction = function() {
  return 5;
};

// html_reorderify.replaceSpacesInQuotes = function(quote) {
// var j,
//     quoteBeginIndex = null,
//     quoteEndIndex = null;
// for (j = 0; j < element.length; j++) {
//   if (quoteBeginIndex === null) {
//     if (element[j] === '\'' || element[j] === '"') {
//       quoteBeginIndex = j;
//     } else if (quoteEndIndex === null) {
//       if (element[j] === '\'' || element[j] === '"') {
//         quoteBeginIndex = null;
//       } else if (element[j] === ' ') {
//         element[j] = '^';
//       }
//     }
//   }
// }
// };
