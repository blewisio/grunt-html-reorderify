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
      // process file contents here
      // ...
    } else {
      grunt.log.warn('File "' + src + '" does not exist.');
    }
  });
};
