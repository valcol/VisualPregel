import React, { Component } from 'react';
import {render} from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import SplitPane from 'react-split-pane';
import Pregel from '../controllers/Pregel';
import Helpers from '../controllers/Helpers';
import GraphHelpers from '../controllers/GraphHelpers';
import Reducers from '../reducers';
import { setNodes, setValues, setInitializeFunction, setAggregateFunction, setDispatchFunction,
resetInitializeFunction, resetAggregateFunction, resetDispatchFunction, setNodesId } from '../actions';

import css from '../components/App.less';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import CodeArea from '../components/CodeArea';
import Graph from './Graph';
import Panel from '../components/Panel';
import FileProgressBar from '../components/ProgressBar';
import FileHandler from '../controllers/FileHandler';
import AppComponent from '../components/App';

const mapStateToProps = (state) => {
  return {
    nodes: state.nodes,
    values: state.values,
    initialize: state.initialize,
    dispatch: state.dispatch,
    aggregate: state.aggregate
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNodes: (nodes) => {
      dispatch(setNodes(nodes));
    },
    setRandomNodes: () => {
      dispatch(setNodes(GraphHelpers.generateRandomGraph()));
    },
    setInitializeFunction: (c) => {
      dispatch(setInitializeFunction(c));
    },
    setDispatchFunction: (c) => {
      dispatch(setDispatchFunction(c));
    },
    setAggregateFunction: (c) => {
      dispatch(setAggregateFunction(c));
    },
    resetInitializeFunction: () => {
      dispatch(resetInitializeFunction());
    },
    resetDispatchFunction: () => {
      dispatch(resetDispatchFunction());
    },
    resetAggregateFunction: () => {
      dispatch(resetAggregateFunction());
    }
  };
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);

export default App;
