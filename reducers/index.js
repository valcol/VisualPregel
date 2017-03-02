import { combineReducers } from 'redux';
import Helpers from '../controllers/Helpers';
import Pregel from '../controllers/Pregel';

const nodes = (state = {}, action) => {
  switch (action.type) {
    case 'SET_NODES':
      return action.nodes;
    default:
      return state;
  }
};

const values = (state = {}, action) => {
  switch (action.type) {
    case 'SET_VALUES':
    console.log('valueset')
      return action.values;
    default:
      return state;
  }
};

const nodesId = (state = '000-000-000-000', action) => {
  switch (action.type) {
    case 'SET_NODES_ID':
      return Helpers.generateId();
    default:
      return state;
  }
};

const initialize = (state = Helpers.functionToString(Pregel.initialize),
 action) => {
  switch (action.type) {
    case 'SET_INITIALIZE_FUNCTION':
      return action.f;
    case 'RESET_INITIALIZE_FUNCTION':
      return Helpers.functionToString(Pregel.initialize);
    default:
      return state;
  }
};

const aggregate = (state = Helpers.functionToString(Pregel.aggregate),
 action) => {
  switch (action.type) {
    case 'SET_AGGREGATE_FUNCTION':
      return action.f;
    case 'RESET_AGGREGATE_FUNCTION':
      return Helpers.functionToString(Pregel.aggregate);
    default:
      return state;
  }
};

const dispatch = (state = Helpers.functionToString(Pregel.dispatch),
 action) => {
  switch (action.type) {
    case 'SET_DISPATCH_FUNCTION':
      return action.f;
    case 'RESET_DISPATCH_FUNCTION':
      return Helpers.functionToString(Pregel.dispatch);
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
  nodes,
  nodesId,
  values,
  initialize,
  aggregate,
  dispatch,
  uploadGraph,
  uploadValues
});
