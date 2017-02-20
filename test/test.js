'use strict';

let assert = require('assert');
let fs = require('fs');

import Helpers from '../controllers/Helpers/index.js';
import FileHandler from '../controllers/FileHandler/index.js';

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

// parsing test of fileToGraph function.
describe('parsingTest()',function(){
  let values= "8,4,5\n7,1,2\n1,2,3\n2,5,4";
  let nodes = {
  '1': { id: 1, listOfNeighbours: [ 2, 3 ] },
  '2': { id: 2, listOfNeighbours: [ 5, 4 ] },
  '3': { id: 3, listOfNeighbours: [] },
  '4': { id: 4, listOfNeighbours: [] },
  '5': { id: 5, listOfNeighbours: [] },
  '7': { id: 7, listOfNeighbours: [ 1, 2 ] },
  '8': { id: 8, listOfNeighbours: [ 4, 5 ] }
};
  it('test the output of parsing',function(){
      FileHandler.fileToGraphForTest(values);
      assert.deepEqual(FileHandler.listOfNodes, nodes);
  });
});
