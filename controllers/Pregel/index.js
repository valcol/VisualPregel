let Pregel = function() {};

Pregel.prototype.initializeBase = function(id, attr) {
  /* id represent the id of the vertex
  attr : the vertex's current property */
  return [attr, -1];
};

Pregel.prototype.dispatchBase = function(srcId, srcAttr, dstId, dstAttr, isANeighbour) {
  /* The parameters of this function represent the source and destination of the id of the vertex as well as its property*/
  if (srcAttr[0] == srcAttr[1] || !isANeighbour) {
    return;
  }
  else {
    return srcAttr[0];
  }
};

Pregel.prototype.aggregateBase = function(id, attr, messages) {
  /*
  The parameters of this function are the same as the Initialize function but with a pair of messages on top
  */
  let current = attr[0];
  for (let message of messages) {
    if (message < current) {
      current = message;
    }
  }
  return [current, attr[0]];
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, 10));
}

Pregel.prototype.start = async function(edges, nodes, setNodes, setEdgesMessages) {
    let newNodes = {};
    nodes.entrySeq().forEach(([key,value]) =>{
        let values = this.initialize(key, value.get('value'));
        newNodes[key] = {value: values, isActive: true};
    });

  let maxIterations = 30;
  setNodes(newNodes);
  await sleep(10);
  let isANeighbourg = {};
  edges.entrySeq().forEach(([key,value]) =>{
    isANeighbourg[value.get('from')+"to"+value.get('to')] = key;
  });

  while ((maxIterations !== 0)) {
    let messages = {};
    let newNodes2 = {};
    let newEdgesMessages = {};
    let messagesFrom = {};
    let destNodes = {};

    for (let keyFrom in newNodes) {
      let valueFrom = newNodes[keyFrom].value;
      for (let keyTo in newNodes) {
        let valueTo = newNodes[keyTo].value;
        let message = this.dispatch(keyFrom, valueFrom, keyTo, valueTo,
          isANeighbourg[keyFrom+'to'+keyTo] ? true : false);
        console.log(valueFrom);
        if (typeof message !== 'undefined') {
          if (typeof isANeighbourg[keyFrom+'to'+keyTo] !== 'undefined')
            newEdgesMessages[isANeighbourg[keyFrom+'to'+keyTo]] = message;
          messagesFrom[keyFrom] = true;
          destNodes[keyTo] = true;
          if (!(keyTo in messages))
            messages[keyTo] = [message];
          else
            messages[keyTo].push(message);
        }
      }
    }

     setEdgesMessages(newEdgesMessages);
     await sleep(10);
    nodes.entrySeq().forEach(([key,value]) => {
          newNodes2[key] = {};
          newNodes2[key].isActive = messagesFrom[key] ? true : false;
          newNodes2[key].value = this.aggregate(key, newNodes[key].value, messages[key] ? messages[key] : []);
      });
    setNodes(newNodes2);
    await sleep(10);
    newNodes = newNodes2;
    if (Object.keys(messages).length > 0)
        maxIterations--;
    else
      maxIterations = 0;
  }
};


Pregel.prototype.initializeNeighboringSummits = function(id, attr) {
  /* In the array below, the boolean is used to detect if a node has other neighbours
   and id is the node identifier. Numbers after that indentifier are
   the node's neighbours (nodes the identifier can receive messages from)
  */
  return [false, id];
};

Pregel.prototype.dispatchNeighboringSummits = function(srcId, srcAttr, dstId, dstAttr, isANeighbour) {
  if (isANeighbour)
    if (srcAttr[0] == true) {
      srcAttr[0] = false;
      return;
    } else {
      return srcAttr;
    }
  else return;
};

Pregel.prototype.aggregateNeighboringSummits = function(id, attr, messages) {
  attr[0] = true;
  for (let tab in messages) {
    for (let i = 1; i<messages[tab].length; i++) {
      if (attr.indexOf(messages[tab][i]) == -1) {
        // new neighbour found
        attr.push(messages[tab][i]);
        attr[0] = false;
      }
    }
  }
  return attr;
};


Pregel.prototype.initializeTriangleCounting = function(id, attr) {
 /* In the structure below, n is the current iteration number.
    Tr will contain set of nodes that are in a triangle
    tab.id is a node's id
    tab.to are outgoing nodes (nodes we send messages to)
    tab.from are incoming nodes (nodes we receive messages from)
   */
  let obj = {
    n: 0,
    tab: {
      to: [],
      from: [],
      id: 0
    },
    Tr: []
  };
  return obj;
};

Pregel.prototype.dispatchTriangleCounting = function(srcId, srcAttr, dstId, dstAttr, isANeighbour) {
  if (isANeighbour) {
    if (srcAttr.n == 0) {
      if(! srcAttr.tab.to.includes(dstId)){
        // fill "to" and "id" for first step
        srcAttr.tab.to.push(dstId);
        srcAttr.tab.id = srcId;
      }
      return srcId;
    } else if (srcAttr.n == 1) {
      // send "tab" object to neighbours
      return srcAttr;
    } else if (srcAttr.n == 2) {
      // send "Tr" object to neighbours
      return srcAttr.Tr;
    } else {
      return;
    }
  } else return;
};

Pregel.prototype.aggregateTriangleCounting = function(id, attr, messages) {
  if (attr.n == 0) {
    // fill "from" object for first step
    attr.n += 1;
    for (let message of messages) {
      if(! attr.tab.from.includes(message)){
      	attr.tab.from.push(message);
      }
    }
    return attr;
  } else if (attr.n == 1) {
    // get "tab" object from neighbours
    attr.n += 1;
    let tab2 = [];
    for (let message of messages) {
      tab2.push(message.tab);
    }
    attr.tab2 = tab2;
    return attr;
  } else {
    // iterate over "tab" objects to find triangles

    // my_i, my_j and my_k will contain each one node of a triangle
    let my_i = attr.tab.id;
    let my_j = 0;
    let my_k = 0;
    // triangles will contain set of nodes that are in a triangle
    let triangles = [];
    // x and y will check if my_j and my_k are direct neighbors of my_i
    // and also if my_i, my_j and my_k can be 3 nodes of a triangle
    let x = 0;
    let y = 0;

    // loop over data structure to find 3 nodes that are in a triangle
    for (let i in attr.tab.to) {
      my_j = attr.tab.to[i];
      for (let j in attr.tab2) {
        my_k = attr.tab2[j].id;
        x = attr.tab2[j].from.indexOf(my_j);
        y = attr.tab2[j].to.indexOf(my_i);
        if (x > -1 && y > -1) {
          // a triangle is found, so its nodes are pushed in "triangles" ( an array)
          triangles.push(my_i, my_j, my_k);
          triangles.sort(function (a, b) {
            return a - b;
          });
          triangles.push(';');
        }
      }
    }
    let obj = {
      n: 3,
      id: id,
      Tr: triangles
    };
    return obj;
  }
};


Pregel = new Pregel();
export default Pregel;
