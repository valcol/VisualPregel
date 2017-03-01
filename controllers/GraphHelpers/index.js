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
    nodes[i].value = i;
  }
  return nodes;
}


GraphHelpers.prototype.getLayout = function(vertexSize, nodes){
  let g = new Dagre.graphlib.Graph();
  g.setGraph({});
  g.setDefaultEdgeLabel(function() { return {}; });
  for (let nodeID in nodes) {
    g.setNode(nodeID, {width: vertexSize, height: vertexSize});
  }
  for (let nodeID in nodes){
    for (let neighbourID of nodes[nodeID].listOfNeighbours)
    g.setEdge(nodeID, neighbourID);
  }
  Dagre.layout(g);

  return g;
}

export default new GraphHelpers();
