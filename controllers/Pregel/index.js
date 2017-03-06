let Pregel = function() {};

Pregel.prototype.initialize = function(id, attr) {
  return attr;
};

Pregel.prototype.dispatch = function(srcId, srcAttr, dstId, dstAttr) {
  return srcAttr;
};

Pregel.prototype.aggregate = function(id, attr, messages) {
  let current = attr;
  for (let message of messages) {
    if (message < attr)
      current = message;
  }
  return current;
};

/*
 *The pregelMock function aim is to give us a Pregel minimal skeleton
 *with a simple example : a counter.
 *Each node will count his neighbour's value attribute as long as a number of iteration
 *is not reached
 */
Pregel.prototype.start = function(edges, nodes, setNodes, setEdgesMessages) {
  let maxIterations = 15;
  let newNodes = {};
  let newEdgesMessages = {};

  for (let node in nodes)
    newNodes[node] = this.initialize(node, nodes[node]);
  setNodes(newNodes);

  while (maxIterations !== 0) {
    let messages = {};
    let newNodes2 = {};
    for (let edge in edges) {
      let edgeObject = edges[edge];
      let message = this.dispatch(edgeObject.from, newNodes[edgeObject.from], edgeObject.to, newNodes[edgeObject.to]);
      newEdgesMessages[edge] = message;
      if (!(edgeObject.to in messages))
        messages[edgeObject.to] = [message];
      else
        messages[edgeObject.to].push(message);
    }
    setEdgesMessages(newEdgesMessages);

    for (let node in nodes)
      if ((node in messages))
        newNodes2[node] = this.aggregate(node, newNodes[node], messages[node]);
    setNodes(newNodes2);

    newNodes = newNodes2;
    maxIterations--;
  }
};

Pregel = new Pregel();
export default Pregel;
