import React, { Component } from 'react';
import { Button } from 'react-bootstrap';


class PregelMock extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.pregelMock();
  }

  render() {
    return (<Button className='pregel_button' bsSize = "large" onClick = { this.handleClick } block > Apply Pregel algorithm </Button>
    );
  }
}

export default PregelMock;
