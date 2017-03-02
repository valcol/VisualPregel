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

import css from './App.less';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import CodeArea from './CodeArea';
import Graph from './Graph';
import Panel from './Panel';
import FileProgressBar from './ProgressBar';
import FileHandler from '../controllers/FileHandler';

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

let App = (state) => {
    return (
      <Grid fluid>
        <Row className="app-container no-padding no-margin">
            <SplitPane split="vertical" defaultSize="20%">
              <Panel
                execute={state.setRandomNodes}
                updateGraph={state.setNodes}
                updateValues={state.setValues}
                nodes = {state.nodes}
                />
              <SplitPane split="horizontal" defaultSize="40%">
                <SplitPane split="vertical" defaultSize="50%">
                  <CodeArea
                    title='1. Initialization'
                    code = {state.initialize}
                    handleCodeChange = {state.setInitializeFunction}
                    handleCodeReset = {state.resetInitializeFunction}
                  />
                  <CodeArea
                    title='2. Dispatch'
                    code = {state.dispatch}
                    handleCodeChange = {state.setDispatchFunction}
                    handleCodeReset = {state.resetDispatchFunction}
                  />
                </SplitPane>
                <SplitPane split="vertical" defaultSize="45%">
                  <CodeArea
                    title='3. Aggregation'
                    code = {state.aggregate}
                    handleCodeChange = {state.setAggregateFunction}
                    handleCodeReset = {state.resetAggregateFunction}
                  />
                  <Graph
                    nodes = {state.nodes}
                    values = {state.values}
                  />
                </SplitPane>
              </SplitPane>
            </SplitPane>
        </Row>
      </Grid>
    );
  }

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App;
