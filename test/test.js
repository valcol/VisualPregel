'use strict';

let assert = require('assert');
let fs = require('fs');

import Helpers from '../controllers/Helpers/index.js';
import FileHandler from '../controllers/FileHandler/index.js';
import Pregel from '../controllers/Pregel/index.js';

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
describe('parsingGraph()',function(){
  let values = "8,4\n7,1\n1,2\n2,5";
  let nodesFinal = {
      '1': { value: 1, initialValue: -1 },
      '2': { value: 2, initialValue: -1 },
      '4': { value: 4, initialValue: -1 },
      '5': { value: 5, initialValue: -1 },
      '7': { value: 7, initialValue: -1 },
      '8': { value: 8, initialValue: -1 }
  };

  it('should parse a CSV file and output a graph object in the best case',function(){
    let update = function(val1,val2){};
    let callback = function(val1,val2){};
    FileHandler.parsingGraph(values, ',', update,
      (n,m,x) => {assert.deepEqual(m, nodesFinal);} , callback
    );
  });

  values = "8,4\n\n1\n1,2\n2,5\n\n1";
  nodesFinal = {
      '1': { value: 1, initialValue: -1 },
      '2': { value: 2, initialValue: -1 },
      '4': { value: 4, initialValue: -1 },
      '5': { value: 5, initialValue: -1 },
      '8': { value: 8, initialValue: -1 }
  };
  it('should parse a CSV file and output a graph object with mistakes',function(){
    let update = function(val1,val2){};
    let callback = function(val1,val2){
    };
    FileHandler.parsingGraph(values, ',', update,
      (n,m,x) => {assert.deepEqual(m, nodesFinal);} , callback
    );
  });

  values = "8,4\n7,1\n1,2\n2,5\n1,8\n7,5";
  nodesFinal = {
      '1': { value: 1, initialValue: -1 },
      '2': { value: 2, initialValue: -1 },
      '4': { value: 4, initialValue: -1 },
      '5': { value: 5, initialValue: -1 },
      '7': { value: 7, initialValue: -1 },
      '8': { value: 8, initialValue: -1 }
  };
  it('should parse a CSV file and output a graph object with redefinition of a node\'s neighborhood',function(){
    let update = function(val1,val2){};
    let callback = function(val1,val2){};
    FileHandler.parsingGraph(values, ',', update,
      (n,m,x) => {assert.deepEqual(m, nodesFinal);} , callback
    );
  });

// TO CONTINUE
    /*
    values = "8,4,7\n7,1\n1,2\n2,5\n1,8\n7,5\n";
    nodesFinal = {
        '1': { value: 1, initialValue: -1 },
        '2': { value: 2, initialValue: -1 },
        '4': { value: 4, initialValue: -1 },
        '5': { value: 5, initialValue: -1 },
        '7': { value: 7, initialValue: -1 },
        '8': { value: 8, initialValue: -1 }
    };
    let count = 0;
    it('should test number ',function(){
        let update = function(val1,val2){};
        let setError= function(val1,val2){
            count++;
        };
        console.log(count);
        FileHandler.parsingGraph(values, ',', update,
            (n,m,x) => {assert.deepEqual(m, nodesFinal);} , setError
        );
    });
*/

});

// parsing test of fileToGraph function.
describe('parsingValues()',function(){
  let values= "1,2\n7,1\n4,2\n2,5\n";
  let nodes = {
    '1': { listOfNeighbours: [ 2, 3 ], value: ''},
    '2': { listOfNeighbours: [ 5, 4 ], value: '' },
    '3': { listOfNeighbours: [], value: '' },
    '4': { listOfNeighbours: [], value: '' },
    '5': { listOfNeighbours: [], value: '' },
    '7': { listOfNeighbours: [ 1, 2 ], value: '' },
    '8': { listOfNeighbours: [ 4, 5 ], value: '' }
  };
  let nodesFinal = {
    '1': {initialValue: -1, value: 2},
    '2': {initialValue: -1, value: 5},
    '4': {initialValue: -1, value: 2},
    '7': {initialValue: -1, value: 1}
    };
  it('should parse a CSV file and output a values object',function(){
    let update = function(val1, val2) {};
    let callback = function(val1, val2) {};
    FileHandler.parsingValues(values, ',', update,
      (n) => {assert.deepEqual(n, nodesFinal);}
    );
  });
});

//
describe('dispatchBase()',function(){
    let srcId = 1 , srcAttr = 10 ;
    it('test dispatch function', function () {
        let dispatch = Pregel.dispatchBase(srcId,srcAttr);
        let result = 10;
       assert.equal(dispatch,result);
    });
});

/*
describe('aggregate()',function(){
    it('', function () {

    });
});
*/
