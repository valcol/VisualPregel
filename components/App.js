import React, { Component } from 'react';
import {render} from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import SplitPane from 'react-split-pane';
import css from './App.less';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import CodeAreaInitialize from '../containers/CodeAreaInitialize';
import CodeAreaDispatch from '../containers/CodeAreaDispatch';
import CodeAreaAggregate from '../containers/CodeAreaAggregate';
import Graph from '../containers/Graph';
import Panel from '../containers/Panel';
import ModuleError from '../containers/ModuleError';
import ButtonControl from '../containers/ButtonControl';

const App = () => {
  return (
    <Grid fluid>
      <ModuleError/>
      <Row className="app-container no-padding no-margin">
          <SplitPane split="vertical" defaultSize="15%">
            <Panel/>
            <SplitPane split="horizontal" defaultSize="30%">
              <SplitPane split="vertical" defaultSize="30%">
                <CodeAreaInitialize />
                <CodeAreaDispatch/>
              </SplitPane>
              <SplitPane split="vertical" defaultSize="30%">
                <CodeAreaAggregate/>
                <div>
                  <Graph/>
                  <ButtonControl/>
                </div>
              </SplitPane>
            </SplitPane>
          </SplitPane>
      </Row>
    </Grid>
  );
};


export default App;
