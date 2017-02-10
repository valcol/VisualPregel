import React, { Component } from 'react';
import {render} from 'react-dom';
import SplitPane from 'react-split-pane';
import Pregel from '../controllers/Pregel';

import css from './App.less';
import { Grid, Col, Row } from 'react-bootstrap';
import CodeArea from './CodeArea';
import Graph from './Graph';
import Panel from './Panel';


export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid fluid>
        <Row className="app-container no-padding no-margin">
          <Col xs={12} md={3} className="left-col no-padding">
            <Panel/>
          </Col>
          <Col xs={12} md={9} className="right-col no-padding">
            <SplitPane split="horizontal" defaultSize="40%">
              <SplitPane split="vertical" defaultSize="50%">
                  <CodeArea
                    title='1. Initialization'
                    baseCode = {Pregel.initialize.toString()}
                    />
                  <CodeArea
                    title='2. Dispatch'
                    baseCode = {Pregel.dispatch.toString()}
                  />
              </SplitPane>
              <SplitPane split="vertical" defaultSize="45%">
                <CodeArea
                  title='3. Aggregation'
                  baseCode = {Pregel.aggregate.toString()}
                  />
                <Graph />
              </SplitPane>
            </SplitPane>
          </Col>
        </Row>
      </Grid>
    );
  }
}

render(<App/>, document.getElementById('app'));