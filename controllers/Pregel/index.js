let Pregel = function() {};

Pregel.prototype.initializeBase = function(id, attr, initialAttr) {
  return [attr, initialAttr];
};

Pregel.prototype.dispatchBase = function(srcId, srcAttr, dstId, dstAttr) {
  return srcAttr;
};

Pregel.prototype.aggregateBase = function(id, attr, messages) {
  let current = attr;
  for (let message of messages) {
    if (message < attr)
      current = message;
  }
  return current;
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*
 *The pregelMock function aim is to give us a Pregel minimal skeleton
 *with a simple example : a counter.
 *Each node will count his neighbour's value attribute as long as a number of iteration
 *is not reached
 */


Pregel.prototype.start = async function(edges, nodes, setNodes, setEdgesMessages, waitingTime) {
  let maxIterations = 15;
  let newNodes = {};


  for (let node in nodes){
    let values = this.initialize(node, nodes[node].value, nodes[node].initialValue);
    newNodes[node] = {initialValue: values[1], value: values[0]};
  }
  setNodes(newNodes);
  if(waitingTime != 0)
    await sleep(waitingTime);
  while ((maxIterations !== 0)) {
    let messages = {};
    let newNodes2 = {};
    let newEdgesMessages = {};
    for (let edge in edges) {
      let edgeObject = edges[edge];
      if (newNodes[edgeObject.from].value !== newNodes[edgeObject.from].initialValue){
        let message = this.dispatch(edgeObject.from, newNodes[edgeObject.from].value, edgeObject.to, newNodes[edgeObject.to].value);
        newEdgesMessages[edge] = message;
        if (!(edgeObject.to in messages))
          messages[edgeObject.to] = [message];
        else
          messages[edgeObject.to].push(message);
      }
    }
    setEdgesMessages(newEdgesMessages);
    if(waitingTime != 0)
      await sleep(waitingTime);
    for (let node in nodes){
      if ((node in messages)) {
        newNodes2[node] = {};
        newNodes2[node].initialValue = newNodes[node].value;
        newNodes2[node].value = this.aggregate(node, newNodes[node].value, messages[node]);
      }
      else {
        newNodes2[node] = {};
        newNodes2[node].initialValue = newNodes[node].value;
        newNodes2[node].value = newNodes[node].value;
      }
    }
    setNodes(newNodes2);
    if(waitingTime != 0)
      await sleep(waitingTime);
    newNodes = newNodes2;

    if (Object.keys(messages).length > 0)
        maxIterations--;
    else
      maxIterations = 0;
  }
};

Pregel = new Pregel();
export default Pregel;
