'use strict';

// var grunt = require('grunt');
var html_reorderify = require('../tasks/html_reorderify.js');
/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

function getExpectedAttributes(names, values, orders) {
  var attributes = [],
      i;
  for (i = 0; i < names.length; i++) {
    var obj = {
                name: names[i],
                value: values[i],
                order: orders[i]
              };
    attributes.push(obj);
  }
  return attributes;
}

exports.html_reorderify = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  test_testFunction: function(test) {
    test.expect(1);
    
    var actual = html_reorderify.testFunction();
    var expected = 5;
    
    test.equal(actual, expected, 'should describe an example test.');
    test.done();
  },
  test_getEachAttribute_single: function(test) {
    test.expect(1);

    var options = {left: ['id']};
    var attributes = ['id="testId"'];// class="testClass" style="display: none;"'
    var actual = html_reorderify.getEachAttribute(attributes, options);
    var expected = [{name: 'id', value: '"testId"', order: 0}];

    test.deepEqual(actual, expected, 'should do something fill this in later');
    test.done();
  },
  test_getEachAttribute_double: function(test) {
    test.expect(1);

    var options = {left: ['id', 'class']};
    var attributes = ['id="testId"', 'class="testClass"'];
    var actual = html_reorderify.getEachAttribute(attributes, options);
    var expected = getExpectedAttributes(['id', 'class'], ['"testId"', '"testClass"'], [0, 1]);

    test.deepEqual(actual, expected, 'should do something fill this in later');
    test.done();
  },
  test_getEachAttribute_triple: function(test) {
    test.expect(1);

    var options = {left: ['id', 'class', 'style']};
    var attributes = ['id="testId"', 'class="testClass"', 'style="display: none;"'];
    var actual = html_reorderify.getEachAttribute(attributes, options);
    var expected = getExpectedAttributes(['id', 'class', 'style'], ['"testId"', '"testClass"', '"display: none;"'], [0, 1, 2]);

    test.deepEqual(actual, expected, 'should do something fill this in later');
    test.done();
  },
  test_getEachAttribute_missing_from_options: function(test) {
    test.expect(2);

    var options = {left: ['id']};
    var attributes = ['id="testId"', 'class="testClass"', 'style="display: none;"'];
    var actual = html_reorderify.getEachAttribute(attributes, options);
    
    var idAttribute = actual.filter(function(attribute) { return attribute.name === 'id'; })[0];
    var classAttribute = actual.filter(function(attribute) { return attribute.name === 'class'; })[0];
    var styleAttribute = actual.filter(function(attribute) { return attribute.name === 'style'; })[0];
    
    var errorMessage = 'Attributes specified in options should have strictly lower order than non-specified attributes';
    test.ok(idAttribute.order < classAttribute.order, errorMessage);
    test.ok(idAttribute.order < styleAttribute.order, errorMessage);
    test.done();
  },
  test_getEachAttribute_preserve_number_of_attributes: function(test) {
    test.expect(1);

    var options = {left: ['id']};
    var attributes = ['id="testId"', 'class="testClass"', 'style="display: none;"', 'data-bind="visible: isVisible"'];
    var actual = html_reorderify.getEachAttribute(attributes, options);

    test.equal(attributes.length, actual.length, 'Should output the same number of attributes as passed in');
    test.done();
  },
};
