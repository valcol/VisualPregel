import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class CodeArea extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FormGroup controlId="formControlsTextarea">
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl className="code-area" componentClass="textarea" placeholder="code here.." />
      </FormGroup>
    );
  }
}

export default CodeArea;
