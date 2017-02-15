'use strict';

let assert = require('assert');
let fs = require('fs');

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

/**
function to create 2 test files
---- To modify: content of goodValues and badValues. ----
**/

describe('CreateTextFile',function(){
  let goodValues = '0,3 \n3,2\n';
  let badValues = '4,1 \n4,9\n';
  let values= [goodValues,badValues];
  console.log(values);
  it('create file ',function(){
    for (var i = 0; i < 2; i++) {
      fs.writeFile('testFile'+i+'.csv',values[i]+'\n', function (err) {
          if (err) throw err;
          console.log('Files created');
      });
    }
  });
});
