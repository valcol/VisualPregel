import { combineReducers } from 'redux';
import Helpers from '../controllers/Helpers';
import Pregel from '../controllers/Pregel';
import GraphHelpers from '../controllers/GraphHelpers';

const error = (state = "", action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return action.error;
    default:
      return state;
  }
};

const graph = (state = {
  nodes : {},
  edges: {},
  edgesMessages: {},
  id: {
    nodes: 0,
    edges: 0,
    edgesMessages: 0
  }
}, action) => {
  let id;
  switch (action.type) {
    case 'SET_NODES':
      id = Object.assign({}, state.id, {
        nodes: Helpers.generateId()
      });
      let nodes = Object.assign({}, state.nodes, action.nodes);
      return Object.assign({}, state, {
        nodes,
        id
      });
    case 'SET_EDGES':
      id = Object.assign({}, state.id, {
        edges: Helpers.generateId()
      });
      return Object.assign({}, state, {
        edges: action.edges,
        id
      });
    case 'SET_EDGES_MESSAGES':
      id = Object.assign({}, state.id, {
        edgesMessages: Helpers.generateId()
      });
      return Object.assign({}, state, {
        edgesMessages: action.edgesMessages,
        id
      });
    case 'INIT_GRAPH':
      id = Object.assign({}, state.id, {
        edges: Helpers.generateId(),
        nodes: Helpers.generateId(),
        edgesMessages: Helpers.generateId()
      });
      return {
        nodes: action.nodes,
        edges: action.edges,
        edgesMessages: action.edgesMessages,
        id
      };
    default:
      return state;
  }
};

const initialize = (state = Helpers.functionToString(Pregel.initializeBase),
  action) => {
  switch (action.type) {
    case 'SET_INITIALIZE_FUNCTION':
      return action.f;
    case 'RESET_INITIALIZE_FUNCTION':
      return Helpers.functionToString(Pregel.initializeBase);
    default:
      return state;
  }
};

const aggregate = (state = Helpers.functionToString(Pregel.aggregateBase),
  action) => {
  switch (action.type) {
    case 'SET_AGGREGATE_FUNCTION':
      return action.f;
    case 'RESET_AGGREGATE_FUNCTION':
      return Helpers.functionToString(Pregel.aggregateBase);
    default:
      return state;
  }
};

const dispatch = (state = Helpers.functionToString(Pregel.dispatchBase),
  action) => {
  switch (action.type) {
    case 'SET_DISPATCH_FUNCTION':
      return action.f;
    case 'RESET_DISPATCH_FUNCTION':
      return Helpers.functionToString(Pregel.dispatchBase);
    default:
      return state;
  }
};

const uploadGraph = (state = {
  percent: 0,
  style: 'success',
  separator: ',',
  file: ''
}, action) => {
  switch (action.type) {
    case 'SET_UPLOADGRAPH_BAR':
      return Object.assign({}, state, {
        percent: action.percent,
        style: action.style
      });
    case 'SET_UPLOADGRAPH_SEPARATOR':
      return Object.assign({}, state, {
        separator: action.separator
      });
    case 'SET_UPLOADGRAPH_FILE':
      console.log(state);
      return Object.assign({}, state, {
        file: action.file
      });
    case 'RESET_UPLOADGRAPH_FIELDS':
      return {
        percent: 0,
        style: 'success',
        separator: ',',
        file: ''
      };
    default:
      return state;
  }
};

const uploadValues = (state = {
  percent: 0,
  style: 'success',
  separator: ',',
  file: ''
}, action) => {
  switch (action.type) {
    case 'SET_UPLOADVALUES_BAR':
      return Object.assign({}, state, {
        percent: action.percent,
        style: action.style
      });
    case 'SET_UPLOADVALUES_SEPARATOR':
      return Object.assign({}, state, {
        separator: action.separator
      });
    case 'SET_UPLOADVALUES_FILE':
      return Object.assign({}, state, {
        file: action.file
      });
    case 'RESET_UPLOADVALUES_FIELDS':
      return {
        percent: 0,
        style: 'success',
        separator: ',',
        file: ''
      };
    default:
      return state;
  }
};

export default combineReducers({
  error,
  graph,
  initialize,
  aggregate,
  dispatch,
  uploadGraph,
  uploadValues
});
