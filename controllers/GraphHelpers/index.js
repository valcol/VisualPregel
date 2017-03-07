import Dagre from 'dagre';

let GraphHelpers = function() {
};

GraphHelpers.prototype.generateRandomGraph = function() {
  let nodes = {};
  for (let i = 1; i < 11; i++){
    let listOfNeighbours = [];
    for (let i = 1; i<Math.floor((Math.random() * 10) + 1); i++){
      let n = Math.floor((Math.random() * 10) + 1);
      if (listOfNeighbours.indexOf(n) === -1)
      listOfNeighbours.push(n);
    }
    nodes[i] = {listOfNeighbours};
  }

  let myN = {};

  myN.nodes = {
    '1': { value: 1, initialValue: -1},
    '2': { value: 2, initialValue: -1},
    '3': { value: 3, initialValue: -1},
    '4': { value: 4, initialValue: -1}
  };

  myN.edges = {
    1: {from: 1, to: 2},
    2: { from: 2, to: 3},
    3: { from: 3, to: 4},
    4: { from: 4, to: 1}
  };

  myN.edgesMessages = {};

  return myN;
}


GraphHelpers.prototype.getLayout = function(vertexSize, edges){
  let g = new Dagre.graphlib.Graph();
  g.setGraph({});
  for (let edgeID in edges) {
    g.setNode(edges[edgeID].from, {width: vertexSize, height: vertexSize});
    g.setNode(edges[edgeID].to, {width: vertexSize, height: vertexSize});
    g.setEdge(edges[edgeID].from, edges[edgeID].to, {label:'', width:10, height:10});
  }
  Dagre.layout(g);

  return g;
}

GraphHelpers.prototype.getMidpoint = function(x1, x2, y1, y2) {
  let x = (x1 + x2) / 2;
  let y = (y1 + y2) / 2;
  x = (x1 < x2) ? x+10 : x-10;
  y = (y1 < y2) ? y+10 : y-10;
  return {x, y};
}

export default new GraphHelpers();
