import Immutable,{Map} from 'immutable';

export const setIndex = (index) => {
  return {
    type: 'SET_INDEX',
    index
  };
};

export const goToFirstIndex = () => {
  return {
    type: 'FIRST_INDEX'
  };
};

export const goToPreviousIndex = () => {
  return {
    type: 'PREVIOUS_INDEX'
  };
};

export const goToNextIndex = () => {
  return {
    type: 'NEXT_INDEX'
  };
};

export const goToLastIndex = () => {
  return {
    type: 'LAST_INDEX'
  };
};

export const setError = (error) => {
  return {
    type: 'SET_ERROR',
    error
  };
};

export const initGraph = (edges) => {
  let edgesMessages = Map({});
  let nodes = Map({});
  for (let edge in edges) {
    let edgeObject = edges[edge];
    if (!(edgeObject.from in nodes)) {
     nodes=nodes.set(edgeObject.from, Map(
       {
         isActive: true,
         value:edgeObject.from
       }
     ));
    }
    if (!(edgeObject.to in nodes)) {
      let node = {};
      node.value = parseInt(edgeObject.to);
      node.isActive = true;
      nodes=nodes.set(edgeObject.to, Map(
        {
          isActive: true,
          value:edgeObject.to
        }
      ));
    }
  }
  return {
    type: 'INIT_GRAPH',
    edgesMessages,
    edges,
    nodes
  };
};

export const setEdgesMessages = (edgesMessages) => {
  return {
    type: 'SET_EDGES_MESSAGES',
    edgesMessages
  };
};

export const setNodes = (nodes) => {
  return {
    type: 'SET_NODES',
    nodes
  };
};

export const setRandomNodes = () => {
  return {
    type: 'SET_RANDOM_NODES'
  };
};

export const setEdges = (edges) => {
  return {
    type: 'SET_EDGES',
    edges
  };
};

export const setInitializeFunction = (f) => {
  return {
    type: 'SET_INITIALIZE_FUNCTION',
    f
  };
};

export const resetInitializeFunction = () => {
  return {
    type: 'RESET_INITIALIZE_FUNCTION'
  };
};

export const setAggregateFunction = (f) => {
  return {
    type: 'SET_AGGREGATE_FUNCTION',
    f
  };
};

export const resetAggregateFunction = () => {
  return {
    type: 'RESET_AGGREGATE_FUNCTION'
  };
};

export const setDispatchFunction = (f) => {
  return {
    type: 'SET_DISPATCH_FUNCTION',
    f
  };
};

export const resetDispatchFunction = () => {
  return {
    type: 'RESET_DISPATCH_FUNCTION'
  };
};

export const setUploadGraphBar = (style, percent) => {
  return {
    type: 'SET_UPLOADGRAPH_BAR',
    percent,
    style
  };
};

export const setUploadGraphSeparator = (separator) => {
  return {
    type: 'SET_UPLOADGRAPH_SEPARATOR',
    separator
  };
};

export const setUploadGraphFile = (file) => {
  return {
    type: 'SET_UPLOADGRAPH_FILE',
    file
  };
};

export const resetUploadGraph = () => {
  return {
    type: 'RESET_UPLOADGRAPH_FIELDS'
  };
};

export const setUploadValuesBar = (style, percent) => {
  return {
    type: 'SET_UPLOADVALUES_BAR',
    percent,
    style
  };
};

export const setUploadValuesSeparator = (separator) => {
  return {
    type: 'SET_UPLOADVALUES_SEPARATOR',
    separator
  };
};

export const setUploadValuesFile = (file) => {
  return {
    type: 'SET_UPLOADVALUES_FILE',
    file
  };
};

export const resetUploadValues = () => {
  return {
    type: 'RESET_UPLOADVALUES_FIELDS'
  };
};

export const setRefreshValue = (value) => {
  return {
    type: 'SET_REFRESH_VALUE',
    value
  };
};

export const switchIsPlaying = () => {
  return {
  type: 'SWITCH_ISPLAYING'
  };
};

export const setIsPlaying = (value) => {
  return {
  type: 'SET_ISPLAYING',
  value
  };
};
