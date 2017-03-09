let Pregel = function() {};

Pregel.prototype.initializeBase = function(id, attr) {
  return [attr, -1];
};

Pregel.prototype.dispatchBase = function(srcId, srcAttr, dstId, dstAttr) {
  if (srcAttr[0] == srcAttr[1])
    return;
  else
    return srcAttr[0];
};

Pregel.prototype.aggregateBase = function(id, attr, messages) {
  let current = attr[0];
  for (let message of messages) {
    if (message < current)
      current = message;
  }
  return [current, attr[0]];
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
  let maxIterations = 30;
  let newNodes = {};
  for (let node in nodes){
    let values = this.initialize(node, nodes[node].value);
    newNodes[node] = {value: values, isActive: true};
  }
  setNodes(newNodes);
  if(waitingTime != 0)
    await sleep(waitingTime);
  while ((maxIterations !== 0)) {
    let messages = {};
    let newNodes2 = {};
    let newEdgesMessages = {};
    let messagesFrom = {};
      for (let edge in edges) {
        let edgeObject = edges[edge];
        if (newNodes[edgeObject.from].isActive) {
          let message = this.dispatch(edgeObject.from, newNodes[edgeObject.from].value, edgeObject.to, newNodes[edgeObject.to].value);
          if (message){
            newEdgesMessages[edge] = message;
            messagesFrom[edgeObject.from] = true;
            if (!(edgeObject.to in messages))
              messages[edgeObject.to] = [message];
            else
              messages[edgeObject.to].push(message);
          }
        }
      }
    setEdgesMessages(newEdgesMessages);
    if(waitingTime != 0)
      await sleep(waitingTime);
    for (let node in nodes){
      if ((node in messages)) {
        newNodes2[node] = {};
        newNodes2[node].isActive = true;
        newNodes2[node].value = this.aggregate(node, newNodes[node].value, messages[node]);
      }
      else {
        newNodes2[node] = {};
        newNodes2[node].isActive = false;
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
