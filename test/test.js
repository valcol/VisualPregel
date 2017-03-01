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
describe('parsingGraph()',function(){
  let values = "8,4,5\n7,1,2\n1,2,3\n2,5,4\n";
  let nodesFinal = {
    '1': { listOfNeighbours: [ 2, 3 ], value: ''},
    '2': { listOfNeighbours: [ 5, 4 ], value: '' },
    '3': { listOfNeighbours: [], value: '' },
    '4': { listOfNeighbours: [], value: '' },
    '5': { listOfNeighbours: [], value: '' },
    '7': { listOfNeighbours: [ 1, 2 ], value: '' },
    '8': { listOfNeighbours: [ 4, 5 ], value: '' }
  };
  it('should parse a CSV file and output a graph object in the best case',function(){
    let update = function(val1,val2){};
    let callback = function(val1,val2){};
    FileHandler.parsingGraph(values, ',', update,
      (n) => {assert.deepEqual(n, nodesFinal);}
    );
  });

  values = "8,4,5\n\n1\n1,2,3\n2,5,4\n\n1\n\n";
  nodesFinal = {
    '1': { listOfNeighbours: [ 2, 3 ], value: ''},
    '2': { listOfNeighbours: [ 5, 4 ], value: '' },
    '3': { listOfNeighbours: [], value: '' },
    '4': { listOfNeighbours: [], value: '' },
    '5': { listOfNeighbours: [], value: '' },
    '8': { listOfNeighbours: [ 4, 5 ], value: '' }
  };
  it('should parse a CSV file and output a graph object with mistakes',function(){
    let update = function(val1,val2){};
    let callback = function(val1,val2){};
    FileHandler.parsingGraph(values, ',', update,
      (n) => {assert.deepEqual(n, nodesFinal);}
    );
  });

  values = "8,4,5\n7,1,2\n1,2,3\n2,5,4\n1,8,5\n7,5,6,9";
  nodesFinal = {
    '1': { listOfNeighbours: [ 2, 3 ], value: ''},
    '2': { listOfNeighbours: [ 5, 4 ], value: '' },
    '3': { listOfNeighbours: [], value: '' },
    '4': { listOfNeighbours: [], value: '' },
    '5': { listOfNeighbours: [], value: '' },
    '7': { listOfNeighbours: [ 1, 2 ], value: '' },
    '8': { listOfNeighbours: [ 4, 5 ], value: '' }
  };
  it('should parse a CSV file and output a graph object with redefinition of a node\'s neighborhood',function(){
    let update = function(val1,val2){};
    let callback = function(val1,val2){};
    FileHandler.parsingGraph(values, ',', update,
      (n) => {assert.deepEqual(n, nodesFinal);}
    );
  });

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
    '1': { listOfNeighbours: [ 2, 3 ], value: 2},
    '2': { listOfNeighbours: [ 5, 4 ], value: 5 },
    '3': { listOfNeighbours: [], value: '' },
    '4': { listOfNeighbours: [], value: 2 },
    '5': { listOfNeighbours: [], value: '' },
    '7': { listOfNeighbours: [ 1, 2 ], value: 1 },
    '8': { listOfNeighbours: [ 4, 5 ], value: '' }
  };
  it('should parse a CSV file and output a graph object with values',function(){
    let update = function(val1, val2) {};
    let callback = function(val1, val2) {};
    FileHandler.parsingValues(values, ',', nodes, update,
      (n) => {assert.deepEqual(n, nodesFinal);}
    );
  });
});
