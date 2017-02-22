import React, { Component } from 'react';
import {render} from 'react-dom';
import SplitPane from 'react-split-pane';
import Pregel from '../controllers/Pregel';
import Helpers from '../controllers/Helpers';

import css from './App.less';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import CodeArea from './CodeArea';
import Graph from './Graph';
import Panel from './Panel';
import FileProgressBar from './ProgressBar';
import FileHandler from '../controllers/FileHandler';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialize: Helpers.functionToString(Pregel.initialize),
      dispatch: Helpers.functionToString(Pregel.dispatch),
      aggregate: Helpers.functionToString(Pregel.aggregate),
      nodes: {}
    };
    this.generateRandomGraph = this.generateRandomGraph.bind(this);
    this.updateGraph = this.updateGraph.bind(this);
  }

  handleChange(key) {
    return function(code) {
      let state = {};
      state[key] = code;
      this.setState(state);
    }.bind(this);
  }

  handleCodeReset(key) {
    return function() {
      let state = {};
      state[key] = Helpers.functionToString(Pregel[key]);
      this.setState(state);
    }.bind(this);
  }

  handleExecute() {
    let initialize = Helpers.stringToFunction(this.state.initialize);
    let dispatch = Helpers.stringToFunction(this.state.dispatch);
    let aggregate = Helpers.stringToFunction(this.state.aggregate);

    Pregel.mock(initialize, dispatch, aggregate);
  }

  generateRandomGraph(){
    let nodesMock = {
      '1': {
        listOfNeighbours: ['2', '3', '4']
      },
      '2': {
        listOfNeighbours: ['3', '4', '1']
      },
      '3': {
        listOfNeighbours: ['4']
      },
      '4': {
        listOfNeighbours: ['1']
      }
    };

    let nodes = {};
    for (let i=1; i<11; i++){
      let listOfNeighbours = [];
      for (let i=1; i<Math.floor((Math.random() * 10) + 1); i++){
        let n = Math.floor((Math.random() * 10) + 1);
        if (listOfNeighbours.indexOf(n) == -1)
          listOfNeighbours.push(n);
      }
      nodes[i] = {listOfNeighbours};
    }
    this.setState({nodes});
  }

  updateGraph(nodes){
    this.setState({nodes});
  }

  render() {
    return (
      <Grid fluid>
        <Row className="app-container no-padding no-margin">
          <Col xs={12} md={3} className="left-col no-padding">
            <Panel
              execute={() => {
                this.handleExecute();}
              }
              updateGraph={
                this.updateGraph
              }/>
            <Button bsSize="large" onClick={this.generateRandomGraph} block>generateRandomGraph</Button>
            <Button bsSize="large" onClick={this.generateCSVGraph} block>generateCSVGraph</Button>
          </Col>
          <Col xs={12} md={9} className="right-col no-padding">
            <SplitPane split="horizontal" defaultSize="40%">
              <SplitPane split="vertical" defaultSize="50%">
                <CodeArea
                  title='1. Initialization'
                  code = {this.state.initialize}
                  handleCodeChange = {this.handleChange('initialize')}
                  handleCodeReset = {this.handleCodeReset('initialize')}
                />
                <CodeArea
                  title='2. Dispatch'
                  code = {this.state.dispatch}
                  handleCodeChange = {this.handleChange('dispatch')}
                  handleCodeReset = {this.handleCodeReset('dispatch')}
                />
              </SplitPane>
              <SplitPane split="vertical" defaultSize="45%">
                <CodeArea
                  title='3. Aggregation'
                  code = {this.state.aggregate}
                  handleCodeChange = {this.handleChange('aggregate')}
                  handleCodeReset = {this.handleCodeReset('aggregate')}
                />
                <Graph
                  nodes = {this.state.nodes}
                />
              </SplitPane>
            </SplitPane>
          </Col>
        </Row>
      </Grid>
    );
  }
}

render(<App/>, document.getElementById('app'));
