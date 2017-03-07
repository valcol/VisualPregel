import Dagre from 'dagre';

let GraphHelpers = function() {};

GraphHelpers.prototype.generateRandomGraph = function() {
 /* let nodes = {};
  for (let i = 1; i < 11; i++) {
    let listOfNeighbours = [];
    for (let i = 1; i < Math.floor((Math.random() * 10) + 1); i++) {
      let n = Math.floor((Math.random() * 10) + 1);
      if (listOfNeighbours.indexOf(n) === -1)
        listOfNeighbours.push(n);
    }
    nodes[i] = { listOfNeighbours };
  }
  let numberOfNodes = 6;
  let allEdges = { from: {}, to: {} };
  let gr = { nodes: {}, edges: {}, edgesMessages: {} };
  for (let i = 1; i < numberOfNodes; i++) {
    gr.nodes[i] = { value: i, initialValue: -1 };
    let from = Math.floor((Math.random() * numberOfNodes - 1) + 1);
    let to = Math.floor((Math.random() * numberOfNodes - 1) + 1);

    gr.edges[i] = { from: {}, to: {} };
    gr.edges[i].from = from;

    if (gr.edges[i].from !== to)
      gr.edges[i].to = to;
    else
      gr.edges[i].to = Math.floor((Math.random() * numberOfNodes - 1) + 1);
  }
*/
  /////////////////////////////////
  let graph = {};

  graph.nodes = {
    1: { value: 7, initialValue: -1 },
    2: { value: 10, initialValue: -1 },
    3: { value: 5, initialValue: -1 },
    4: { value: 4, initialValue: -1 }
  };

  graph.edges = {
    1: { from: 1, to: 2 },
    2: { from: 2, to: 3 },
    3: { from: 3, to: 4 },
    4: { from: 4, to: 1 }
  };

  graph.edgesMessages = {
    1: '',
    2: '',
    3: ''
  };

  return graph;
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