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
  return { state };
}

let App = ({dispatch, state}) => {
    return (
      <Grid fluid>
        <Row className="app-container no-padding no-margin">
            <SplitPane split="vertical" defaultSize="20%">
              <Panel
                execute={() => {dispatch(setNodes(GraphHelpers.generateRandomGraph()))}}
                updateGraph={(nodes) => {dispatch(setNodes(nodes))}}
                updateValues={(values) => {dispatch(setValues(values))}}
                nodes = {state.nodes}
                />
              <SplitPane split="horizontal" defaultSize="40%">
                <SplitPane split="vertical" defaultSize="50%">
                  <CodeArea
                    title='1. Initialization'
                    code = {state.initialize}
                    handleCodeChange = {(c) => {dispatch(setInitializeFunction(c))}}
                    handleCodeReset = {() => {dispatch(resetInitializeFunction())}}
                  />
                  <CodeArea
                    title='2. Dispatch'
                    code = {state.dispatch}
                    handleCodeChange = {(c) => {dispatch(setDispatchFunction(c))}}
                    handleCodeReset = {() => {dispatch(resetDispatchFunction())}}
                  />
                </SplitPane>
                <SplitPane split="vertical" defaultSize="45%">
                  <CodeArea
                    title='3. Aggregation'
                    code = {state.aggregate}
                    handleCodeChange = {(c) => {dispatch(setAggregateFunction(c))}}
                    handleCodeReset = {() => {dispatch(resetAggregateFunction())}}
                  />
                  <Graph
                    nodes = {state.nodes}
                    values = {state.values}
                    id = {state.nodesId}
                  />
                </SplitPane>
              </SplitPane>
            </SplitPane>
        </Row>
      </Grid>
    );
  }

App = connect(mapStateToProps)(App);

export default App;
