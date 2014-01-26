/*
 * grunt-html-reorderify
 * https://github.com/blewis008/html-reorderify
 *
 * Copyright (c) 2014 Brent Lewis
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    html_reorderify: {
      default: {
        options: {
          left: ['id', 'class'],
        },
        files: [{
          // src: ['**/*.html'],
          src: ['test/acceptance/simple_two_attribute_swap.html'],
          dest: 'test/actual/simple_two_attribute_swap.html',
        }],
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('default', ['html_reorderify:default']);
  
  grunt.registerTask('test', ['clean', 'html_reorderify', 'nodeunit']);

  grunt.registerTask('unittest', ['nodeunit']);

  grunt.registerTask('jshint', ['jshint', 'test']);

};
