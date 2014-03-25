# grunt-html-reorderify

> Reorder HTML attributes such as id, class, or style into a standard order.

## Introduction
This plugin is currently in beta, please open issues as needed for bugs found. Take care when using this plugin - it has not been tested in a production environment.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-html-reorderify --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-html-reorderify');
```

## The "html_reorderify" task

### Overview
In your project's Gruntfile, add a section named `html_reorderify` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  html_reorderify: {
    reorder: {
      options: {
        first: [],
        last: [],
      },
      files: {
        
      },
    },
  },
});
```

### Options

#### options.first
Type: `Array`
Suggested values: `'id, class, data-bind'`

An array that is used to specify the order of attributes to be moved to the beginning of an HTML element.

#### options.last
Type: `Array`
Suggested values: `'runat, style'`

An array that is used to specify the order of attributes to be moved to the end of an HTML element.

### Usage Examples

#### Visual consistency
In this example, a tag written as `<div class="content-list-item" id="firstItem" style="display: inline-block;">` would become `<div id="firstItem" class="content-list-item"  style="display: inline-block;">`. A tag such as `<div>` or `<a href="index.html">` would be unaffected, containing none of the specified attributes in the options. The goal of this plugin is to create visual consistency for HTML files, making scanning easier.

```js
grunt.initConfig({
  html_reorderify: {
    reorder: {
      options: {
        first: ['id', 'class', 'style'],
        last: [],
      },
      files: [
        {
          expand: true,
          cwd: 'test/acceptance/',
          src: ['**/*.html'],
          dest: 'test/actual/',
          ext: '.html',
        },
      ],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* v0.1.0 - Beta release