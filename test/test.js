'use strict';

let assert = require('assert');
import Helpers from '../controllers/Helpers/index.js';

describe('stringToFunction()', function () {
    it('should convert a string into a function', function () {
      let s = 'function (value) {return value * 2;}';
      let f = Helpers.stringToFunction(s);
      assert.ok(f(2), 4);
    });
});

describe('functionToString()', function () {
    it('should convert a function into a string', function () {
      let f = function(value) {return value * 2;};
      let s = Helpers.functionToString(f);
      assert.ok(s, 'function f(value) {return value * 2;}');
    });
});
