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
    done();
  },
  test_test: function(test) {
    test.expect(1);
    
    var actual = html_reorderify.testFunction();
    var expected = 5;
    
    test.equal(actual, expected, 'Should describe an example test.');
    test.done();
  },
  test_getEachAttribute_single: function(test) {
    test.expect(1);

    var options = {left: ['id']};
    var attributes = ['id="testId"'];// class="testClass" style="display: none;"'
    var actual = html_reorderify.getEachAttribute(attributes, options);
    var expected = [{name: 'id', value: '"testId"', order: 0}];

    test.deepEqual(actual, expected, 'Should do something fill this in later');
    test.done();
  },
  test_getEachAttribute_double: function(test) {
    test.expect(1);

    var options = {left: ['id', 'class']};
    var attributes = ['id="testId"', 'class="testClass"'];
    var actual = html_reorderify.getEachAttribute(attributes, options);
    var expected = getExpectedAttributes(['id', 'class'], ['"testId"', '"testClass"'], [0, 1]);

    test.deepEqual(actual, expected, 'Should do something fill this in later');
    test.done();
  },
  test_getEachAttribute_triple: function(test) {
    test.expect(1);

    var options = {left: ['id', 'class', 'style']};
    var attributes = ['id="testId"', 'class="testClass"', 'style="display: none;"'];
    var actual = html_reorderify.getEachAttribute(attributes, options);
    var expected = getExpectedAttributes(['id', 'class', 'style'], ['"testId"', '"testClass"', '"display: none;"'], [0, 1, 2]);

    test.deepEqual(actual, expected, 'Should do something fill this in later');
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
  test_rebuildElement_single: function(test) {
    test.expect(1);

    var attributes = getExpectedAttributes(['id'], ['"testId"'], [0]);
    var actual = html_reorderify.rebuildElement('div', attributes);
    var expected = 'div id="testId"';

    test.equal(actual, expected, 'Should la dee da da skebop do wap');
    test.done();
  },
  test_rebuildElement_double: function(test) {
    test.expect(1);

    var attributes = getExpectedAttributes(['id', 'class'], ['"testId"', '"testClass"'], [0, 1]);
    var actual = html_reorderify.rebuildElement('div', attributes);
    var expected = 'div id="testId" class="testClass"';

    test.equal(actual, expected, 'Should should should should should');
    test.done();
  },
  test_rebuildElement_triple: function(test) {
    test.expect(1);

    var attributes = getExpectedAttributes(['id', 'class', 'style'], ['"testId"', '"testClass1 testClass2"', '"font-size: 1.25em;"'], [0, 1, 2]);
    var actual = html_reorderify.rebuildElement('span', attributes);
    var expected = 'span id="testId" class="testClass1 testClass2" style="font-size: 1.25em;"';

    test.equal(actual, expected, 'Should should should should should');
    test.done();
  },
  test_sortAttributes: function(test) {
    test.expect(1);

    var actual = html_reorderify.sortAttributes([{order: 3}, {order: 2}, {order: 0}, {order: 1}]);
    var expected = [{order: 0}, {order: 1}, {order: 2}, {order: 3}];

    test.deepEqual(actual, expected, 'Should sort correctly...');
    test.done();
  },
  test_buildSortableAttribute: function(test) {
    test.expect(1);

    var options = {left: 'id'};
    var maxOrder = 3;
    var actual = html_reorderify.buildSortableAttribute(['class', '"testClass"'], options, maxOrder);
    var expected = {name: 'class', value: '"testClass"', order: maxOrder};

    test.deepEqual(actual, expected, 'Should build correctly am I right');
    test.done();
  },
  test_getAttributesFromElement: function(test) {
    test.expect(1);

    var element = 'id="testId" class="testClass"';
    var actual = html_reorderify.getAttributesFromElement(element);
    var expected = ['id="testId"', 'class="testClass"'];

    test.deepEqual(actual, expected, 'Should be deep equal');
    test.done();
  },
};
