import Dagre from 'dagre';

let GraphHelpers = function() {};

GraphHelpers.prototype.generateRandomGraph = function() {
  let edges = {};
  let numberOfNodes = Math.round(Math.random()*15) + 5;
  for (let i=0; i<numberOfNodes; i++) {
    edges[i] = {
      from: Math.round(Math.random()*15) + 5,
      to: Math.round(Math.random()*15) + 5
    };
  }
  return edges;
}


GraphHelpers.prototype.getLayout = function(vertexSize, edges) {
  let g = new Dagre.graphlib.Graph();
  g.setGraph({});
  for (let edgeID in edges) {
    g.setNode(edges[edgeID].from, { width: vertexSize, height: vertexSize });
    g.setNode(edges[edgeID].to, { width: vertexSize, height: vertexSize });
    g.setEdge(edges[edgeID].from, edges[edgeID].to, { label: '', width: 10, height: 10 });
  }
  Dagre.layout(g);

  return g;
}

GraphHelpers.prototype.getMidpoint = function(x1, x2, y1, y2) {
  let x = (x1 + x2) / 2;
  let y = (y1 + y2) / 2;
  x = (x1 < x2) ? x + 10 : x - 10;
  y = (y1 < y2) ? y + 10 : y - 10;
  return { x, y };
}

export default new GraphHelpers();
