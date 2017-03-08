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
    let callback = function(val1,val2){
    };
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
    let callback = function(val1,val2){
    };
    FileHandler.parsingGraph(values, ',', update,
      (n,m,x) => {assert.deepEqual(m, nodesFinal);} , callback
    );
  });
});

describe('setError()',function(){
    let valuesWithErrors = "8,4,8\n7,1,3\n1,2,5\n2,5\n1,8\n7,5";
    it('test the error handler function [parsingGraph()]',function(){
        let update = function(val1,val2){};
        var count = 0;
        let numberOfErrors = 3;
        let setError = function(val1,val2){
            count ++;
        };
        FileHandler.parsingGraph(valuesWithErrors, ',', update,
            (n,m,x) => {} , setError
        );
        assert.equal(count,numberOfErrors);
    });
});

// parsing test of fileToGraph function.
describe('parsingValues()',function(){
  let values= "1,2\n7,1\n4,2\n2,5\n";
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


describe('dispatchBase()',function(){
    let srcId = 1 , srcAttr = 10 ;
    it('test dispatch function [Pregel]', function () {
        let dispatch = Pregel.dispatchBase(srcId,srcAttr);
        let result = 10;
       assert.equal(dispatch,result);
    });
});

describe('initializeBase()',function(){
    let srcId = 1 , attr = 1, srcAttr = 10 ;
    it('test initializeBase function [Pregel]', function () {
      let initialize = Pregel.initializeBase(srcId,attr,srcAttr);
      let result = [1,10];
      assert.deepEqual(initialize,result);
    });
});

describe('aggregateBase()',function(){
    let id=1, attr=5, messages = [1,2,3,5,6];
    it('test aggregateBase function [Pregel]', function () {
        let aggregate = Pregel.aggregateBase(id, attr, messages);
        let result = 3;
        assert.equal(aggregate,result);
    });
});

describe('Pregel.start()',function(){

    Pregel.initialize = Pregel.initializeBase;
    Pregel.aggregate = Pregel.aggregateBase;
    Pregel.dispatch = Pregel.dispatchBase;

    let setNodesCalls = [];
    let count = 0;
    let setEMCalls = [];
    let nodes = {
      '1': { initialValue: -1 , value: 1 },
      '2': { initialValue: -1 , value: 2 },
      '3': { initialValue: -1 , value: 3 },
      '4': { initialValue: -1 , value: 4 }
    };
    let edges = {
      '1': { from: 1 , to: 2},
      '2': { from: 2 , to: 3 },
      '3': { from: 3 , to: 2 },
      '4': { from: 4 , to: 1 },
      '5': { from: 1 , to: 3 }
    };
    let expectedNodes = [ { '1': { initialValue: -1, value : 1 },
                            '2': { initialValue: -1, value : 2 },
                            '3': { initialValue: -1, value : 3 },
                            '4': { initialValue: -1, value : 4 }},
                          { '1': { initialValue: 1 , value : 1 },
                            '2': { initialValue: 2 , value : 1 },
                            '3': { initialValue: 3 , value : 1 },
                            '4': { initialValue: 4 , value : 4 }},
                          { '1': { initialValue: 1 , value : 1 },
                            '2': { initialValue: 1 , value : 1 },
                            '3': { initialValue: 1 , value : 1 },
                            '4': { initialValue: 4 , value : 4 }},
                          { '1': { initialValue: 1 , value : 1 },
                            '2': { initialValue: 1 , value : 1 },
                            '3': { initialValue: 1 , value : 1 },
                            '4': { initialValue: 4 , value : 4 }}];
    let expectedMessages = [{ '1' : 1, '2' : 2, 3 : 3, '4' : 4, '5' : 1},
                            { '2' : 1, '3' : 1},
                            {}];
    let setNodes  = function(nodes){
        setNodesCalls.push(nodes);
    };
    let setEdgesMessages  = function(messages){
        setEMCalls.push(messages);
    };
    it('test start function [Pregel]', function () {
        Pregel.start(edges, nodes, setNodes, setEdgesMessages, 0) ;
        assert.deepEqual(setNodesCalls,expectedNodes);
        assert.deepEqual(setEMCalls,expectedMessages);
    });
});
