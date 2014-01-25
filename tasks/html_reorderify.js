/*
 * grunt-html-reorderify
 * https://github.com/blewis008/html-reorderify
 *
 * Copyright (c) 2014 Brent Lewis
 * Licensed under the MIT license.
 */

'use strict';

function reorderAttributes(src, options) {
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
        var elementName = originalElement.substring(0, originalElement.indexOf(' '));
        var element = originalElement.substring(originalElement.indexOf(' ') + 1);
        var attributes = element.split(' ');
        if (attributes.length > 1) {
          var keyValuePairs = [];
          var k;
          for(k = 0; k < attributes.length; k++) {
            var pair = attributes[k].split('=');
            var obj = {
                        'name': pair[0],
                        'value': pair[1],
                        'order': options.left.indexOf(pair[0])
                      };
            keyValuePairs.push(obj);
          }
          keyValuePairs.sort(function (a, b) {
            return a.order - b.order;
          });
          var orderedElement = elementName;
          var m;
          for(m = 0; m < keyValuePairs.length; m++) {
            orderedElement = orderedElement + ' ' + keyValuePairs[m].name + '=' + keyValuePairs[m].value;
          }
          src = src.replace(originalElement, orderedElement);
        }
      }
      tagBeginIndex = null;
      tagEndIndex = null;
    }
  }
  return src;
}

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('html_reorderify', 'Reorder HTML attributes such as id, class, or style into a standard order.', function() {
    debugger;
    
    var options = grunt.config.get('html_reorderify.test.options');

    var src = this.files[0].orig.src[0];
    if (grunt.file.exists(src)) {
      src = grunt.file.read(src);
      src = reorderAttributes(src, options);
      grunt.file.write(this.files[0].dest, src);
    } else {
      grunt.log.warn('File "' + src + '" does not exist.');
    }
  });
};

function replaceSpacesInQuotes(quote) {
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
}