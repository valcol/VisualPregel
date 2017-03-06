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
  return nodes;
}


GraphHelpers.prototype.getLayout = function(vertexSize, nodes){
  let g = new Dagre.graphlib.Graph();
  g.setGraph({});
  for (let nodeID in nodes) {
    g.setNode(nodeID, {width: vertexSize, height: vertexSize});
  }
  for (let nodeID in nodes){
    for (let neighbourID of nodes[nodeID].listOfNeighbours)
    g.setEdge(nodeID, neighbourID, {label:nodeID, width:10, height:10});
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
