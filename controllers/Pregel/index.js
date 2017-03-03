let Pregel = function() {};

Pregel.prototype.initialize = function(node) {
  node.count = 0;
};

Pregel.prototype.dispatch = function(node, neighbourNode) {
  neighbourNode.receivedCount = node.value;
};

Pregel.prototype.aggregate = function(node) {
  node.count += node.receivedCount;
};

Pregel.prototype.mock = function(initialize, dispatch, aggregate) {
  let nodesValues = [10, 2, 3, 4, 5, 6];
  nodesValues = nodesValues.map((v) => (initialize(v)));
  nodesValues = nodesValues.map((v) => (dispatch(v)));
  console.log('Result: ' + aggregate(nodesValues));
};

/*
 *The pregelMock function aim is to give us a Pregel minimal skeleton
 *with a simple example : a counter.
 *Each node will count his neighbour's value attribute as long as a number of iteration
 *is not reached
 */
Pregel.prototype.pregelMock = function() {
  let graph = {
    '1': { listOfNeighbours: [2], value: 1 },
    '2': { listOfNeighbours: [3], value: 2 },
    '3': { listOfNeighbours: [1], value: 3 }
  };

  let maxIterations = 3;
  for (let node in graph)
    this.initialize(graph[node]);

  while (maxIterations !== 0) {
    for (let node in graph)
      for (let i = 0; i < graph[node].listOfNeighbours.length; i++)
        this.dispatch(graph[node], graph[graph[node].listOfNeighbours[i]]);

    for (let node in graph)
      this.aggregate(graph[node]);

    console.log(graph);
    maxIterations--;
  }


};

Pregel = new Pregel();
export default Pregel;