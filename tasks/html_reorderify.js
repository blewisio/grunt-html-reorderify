/*
 * grunt-html-reorderify
 * https://github.com/blewis008/html-reorderify
 *
 * Copyright (c) 2014 Brent Lewis
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('html_reorderify', 'Reorder HTML attributes such as id, class, or style into a standard order.', function() {
    debugger;
    
    var src = this.files[0].orig.src[0];
    if (grunt.file.exists(src)) {
      src = grunt.file.read(src);
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
          // process
          var element = src.substring(tagBeginIndex + 1, tagEndIndex);
          if (element[0] !== '/') {
            element = element.substring(element.indexOf('_')+1);
            var attributes = element.split(' ');
          }
          tagBeginIndex = null;
          tagEndIndex = null;
        }
      }
    } else {
      grunt.log.warn('File "' + src + '" does not exist.');
    }
  });
};
