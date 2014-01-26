'use strict';

var grunt = require('grunt');
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

exports.html_reorderify = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  test_testFunction: function(test) {
    test.expect(1);
    
    var actual = html_reorderify.testFunction();
    var expected = 5;
    
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');
    test.done();
  },
  test_getEachAttribute: function(test) {
    test.expect(1);

    var options = { left: ['id'] };
    var attributes = ['id="testId"'];// class="testClass" style="display: none;"'
    var actual = html_reorderify.getEachAttribute(attributes, options);
    var expected = [ {name: 'id', value: '"testId"', order: 0}];

    test.deepEqual(actual, expected, 'should do something fill this in later_');
    test.done();
  },
};
