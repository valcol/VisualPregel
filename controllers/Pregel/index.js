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

Pregel.prototype.start = function(edges, nodes, setNodes, setEdgesMessages) {

    let newNodes = {};
    nodes.entrySeq().forEach(([key,value]) =>{
        let values = this.initialize(value.get('value'), value.get('value'));
        newNodes[value.get('value')] = {value: values, isActive: true};
    });

  let maxIterations = 30;
  setNodes(newNodes);
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


Pregel.prototype.initializeTriangleCounting = function(id, attr) {
  /* In the structure below, count is the current iteration number.
    tab.id is a node's id
    tab.to are outgoing nodes (nodes we send messages to)
    tab.from are incoming nodes (nodes we receive messages from)
   */
  let obj = {
    count: 0,
    tab: {
      to: [],
      from: [],
      id: 0
    },
    inTriangle: []
  };
  return [attr, obj];
};

Pregel.prototype.dispatchTriangleCounting = function(srcId, srcAttr, dstId, dstAttr) {
  if(srcAttr[1].count == 0){
    // fill "to" and "id" for first step
    srcAttr[1].tab.to.push(dstId);
    srcAttr[1].tab.id = srcId;
    return srcId;
  }
  else if (srcAttr[1].count == 1){
    // send "tab" object to neighbours
    return srcAttr[1];
  }
  else if (srcAttr[1].count == 2){
    // send "inTriangle" object to neighbours
    return srcAttr[1].inTriangle;
  }
  else if (srcAttr[1].count == 3){
    return srcId;
  }
  else{
    return;
  }
};

Pregel.prototype.aggregateTriangleCounting = function(id, attr, messages) {
  if(attr[1].count == 0){
    // fill "from" object for first step
    attr[1].count +=1;
    for (let message of messages) {
     attr[1].tab.from.push(message);
    }
    return [attr[0], attr[1]];
  }
  if(attr[1].count == 1){
    // get "tab" object from neighbours
    attr[1].count +=1;
    let tab2 = [];
    for(let message of messages){
      tab2.push(message.tab);
    }
    attr[1].tab2 = tab2;
    return [attr[0], attr[1]];
  }
  if(attr[1].count == 2){
    // iterate over "tab" objects to find triangles
    attr[1].count += 1;
    // my_i, my_j and my_k will contain each one node of a triangle
    let my_i = attr[1].tab.id;
    let my_j = 0;
    let my_k = 0;
    // triangle will contain set of nodes that are in a triangle
    let triangles = [];
    // x and y will check if my_j and my_k are direct neighbors of my_i
    // and also if my_i, my_j and my_k can be 3 nodes of a triangle
    let x = 0;
    let y = 0;

    // loop over data structure to find 3 nodes that are in a triangle
    for(let i in attr[1].tab.to){
      my_j = attr[1].tab.to[i];
      for(let j in attr[1].tab2){
        my_k = attr[1].tab2[j].id;
        x = attr[1].tab2[j].from.indexOf(my_j);
        y = attr[1].tab2[j].to.indexOf(my_i);
        if(x > -1 && y > -1){
          // a triangle is found, so its nodes are pushed in "triangles" ( an array)
          triangles.push(my_i, my_j, my_k);
          triangles.sort(function(a, b) {
  			return a - b;
          });
          triangles.push(';');
        }
      }
    }
    attr[1].tab = null;
    attr[1].tab2 = null;
    attr[1].inTriangle.push(triangles);
    return [attr[0], attr[1]];
  }
   if(attr[1].count == 3){
     attr[1].count +=1;
     return [attr[0], attr[1]];
   }
};


Pregel = new Pregel();
export default Pregel;
