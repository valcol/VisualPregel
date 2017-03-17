let Pregel = function() {};

Pregel.prototype.initializeBase = function(id, attr) {
  return [attr, -1];
};

Pregel.prototype.dispatchBase = function(srcId, srcAttr, dstId, dstAttr) {
  if (srcAttr[0] == srcAttr[1]) {
    return;
  }
  else {
    return srcAttr[0];
  }
};

Pregel.prototype.aggregateBase = function(id, attr, messages) {
  let current = attr[0];
  for (let message of messages) {
    if (message < current) {
      current = message;
    }
  }
  return [current, attr[0]];
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

Pregel.prototype.start = async function(edges, nodes, setNodes, setEdgesMessages, waitingTime) {

    let newNodes = {};
    nodes.entrySeq().forEach(([key,value]) =>{
        let values = this.initialize(value.get('value'), value.get('value'));
        newNodes[value.get('value')] = {value: values, isActive: true};
    });

  let maxIterations = 30;
  setNodes(newNodes);
  if(waitingTime != 0)
    await sleep(waitingTime);
  while ((maxIterations !== 0)) {
    let messages = {};
    let newNodes2 = {};
    let newEdgesMessages = {};
    let messagesFrom = {};

      let edgesBis=[];
      edges.entrySeq().forEach(([key,value]) =>{
        edgesBis.push({from: value.get('from'), to : value.get('to')});
      });

      for (let edge in edgesBis) {
        let edgeObject = edgesBis[edge];
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
      await sleep(waitingTime)
      nodes.entrySeq().forEach(([key,value]) =>{
          if ((value.get('value') in messages)) {
              newNodes2[value.get('value')] = {};
              newNodes2[value.get('value')].isActive = true;
              newNodes2[value.get('value')].value = this.aggregate(value.get('value'), newNodes[value.get('value')].value, messages[value.get('value')]);
          }
          else {
              newNodes2[value.get('value')] = {};
              newNodes2[value.get('value')].isActive = false;
              newNodes2[value.get('value')].value = newNodes[value.get('value')].value;
          }
      });
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


Pregel.prototype.initializeNeighboringSummits = function(id, attr) {
  /* In the data structure below, obj.count is the current iteration number
    obj.tab will contain every incoming nodes (nodes we can receive messages from)
  */
  let obj = {
  count: 0,
  tab: []
  };
  return [attr, obj];
};

Pregel.prototype.dispatchNeighboringSummits = function(srcId, srcAttr, dstId, dstAttr) {  
  if (srcAttr[1].count == 1) {
    return;
  } else {
    return srcAttr[0];
  }
};

Pregel.prototype.aggregateNeighboringSummits = function(id, attr, messages) {
  let current = attr[0];
  attr[1].count += 1;
  
  for (let message of messages) {
    // push node in incoming array ("tab")
    attr[1].tab.push(message);
  }

  return [current, attr[1]];    
};


Pregel = new Pregel();
export default Pregel;
