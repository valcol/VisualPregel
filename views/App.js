import React, { Component } from 'react';
import {render} from 'react-dom';
import SplitPane from 'react-split-pane';
import Pregel from '../controllers/Pregel';
import Helpers from '../controllers/Helpers';

import css from './App.less';
import { Grid, Col, Row } from 'react-bootstrap';
import CodeArea from './CodeArea';
import Graph from './Graph';
import Panel from './Panel';
import FileProgressBar from './ProgressBar';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialize: Helpers.functionToString(Pregel.initialize),
      dispatch: Helpers.functionToString(Pregel.dispatch),
      aggregate: Helpers.functionToString(Pregel.aggregate)
    };
  }

  handleCodeChange(key) {
    return function(code) {
      let state = {};
      state[key] = code;
      this.setState(state);
    }.bind(this);
  }

  handleExecute() {
    let initialize = Helpers.stringToFunction(this.state.initialize);
    let dispatch = Helpers.stringToFunction(this.state.dispatch);
    let aggregate = Helpers.stringToFunction(this.state.aggregate);

    Pregel.mock(initialize, dispatch, aggregate);
  }

  render() {
    return (
      <Grid fluid>
        <Row className="app-container no-padding no-margin">
          <Col xs={12} md={3} className="left-col no-padding">
            <Panel
            execute={() => {
              this.handleExecute();
            }
            }/>
          </Col>
          <Col xs={12} md={9} className="right-col no-padding">
            <SplitPane split="horizontal" defaultSize="40%">
              <SplitPane split="vertical" defaultSize="50%">
                  <CodeArea
                    title='1. Initialization'
                    code = {this.state.initialize}
                    handleCodeChange = {this.handleCodeChange('initialize')}
                    />
                  <CodeArea
                    title='2. Dispatch'
                    code = {this.state.dispatch}
                    handleCodeChange = {this.handleCodeChange('dispatch')}
                  />
              </SplitPane>
              <SplitPane split="vertical" defaultSize="45%">
                <CodeArea
                  title='3. Aggregation'
                  code = {this.state.aggregate}
                  handleCodeChange = {this.handleCodeChange('aggregate')}
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
