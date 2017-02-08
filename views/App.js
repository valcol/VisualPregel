import React, { Component } from 'react';
import {render} from 'react-dom';

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
        <Row className="app-container">
          <Col xs={12} md={2}>
            <Panel/>
          </Col>
          <Col xs={12} md={10}>
            <Row className="top-row">
              <Col xs={12} md={6}><CodeArea label='Initialize'/></Col>
              <Col xs={12} md={6}><CodeArea label='Send'/></Col>
            </Row>
            <Row className="bottom-row">
              <Col xs={12} md={6}><CodeArea label='Agregate'/></Col>
              <Col xs={12} md={6}><Graph/></Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

render(<App/>, document.getElementById('app'));
