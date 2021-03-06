import { combineReducers } from 'redux';
import Immutable, {List, Map} from 'immutable';
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

const graph = (state = { graphs: List.of(
  Map({
      nodes : Map({}),
      edges: Map({}),
      edgesMessages: Map({}),
      id: Map({
        nodes: 0,
        edges: 0,
        edgesMessages: 0
      })
    })
),
index: 0
}, action) => {
  let graphs;
  let graphToSet;
  switch (action.type) {
    case 'SET_NODES':
    graphs = state.graphs.push(state.graphs.get(state.graphs.size - 1).set('nodes', Immutable.fromJS(action.nodes)).setIn(['id', 'nodes'], Helpers.generateId()));
    return {graphs, index: state.index};
    case 'SET_EDGES_MESSAGES':
    graphs = state.graphs.push(state.graphs.get(state.graphs.size - 1).set('edgesMessages', Immutable.fromJS(action.edgesMessages)).setIn(['id', 'edgesMessages'], Helpers.generateId()));
    return {graphs, index: state.index};
    case 'SET_INDEX':
    return {graphs: state.graphs, index: action.index};
    case 'PREVIOUS_INDEX':
    return {
      graphs: state.graphs,
      index: (state.index > 0) ? state.index - 1 : 0
    };
    case 'NEXT_INDEX':
    return {
      graphs: state.graphs,
      index: (state.index < state.graphs.size - 1) ? state.index + 1 : state.graphs.size - 1
    };
    case 'FIRST_INDEX':
    return {
      graphs: state.graphs,
      index: 0
    };
    case 'LAST_INDEX':
    return {
      graphs: state.graphs,
      index: state.graphs.size - 1
    };
    case 'INIT_GRAPH':
    return { graphs: List.of(
      Map({
            nodes : action.nodes,
            edges: Immutable.fromJS(action.edges),
            edgesMessages: action.edgesMessages,
            id: Map({
              nodes: Helpers.generateId(),
              edges: Helpers.generateId(),
              edgesMessages: Helpers.generateId()
            })
          })
      ),
      index: 0
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


const refreshValue = (state = 1, action) => {
  switch (action.type) {
    case 'SET_REFRESH_VALUE':
    return action.value;
    default:
    return state;
  }
};

const isPlaying = (state = false, action) => {
  switch (action.type) {
    case 'SWITCH_ISPLAYING':
    return !state;
    case 'SET_ISPLAYING':
    return action.value;
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
  uploadValues,
  refreshValue,
  isPlaying
});
