import React, {Component} from 'react';
import { FormGroup, ProgressBar, Button } from 'react-bootstrap';

class FileProgressBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <ProgressBar now={this.props.percent} bsStyle={this.props.bsStyle} label={this.props.percent+"%"} />
      </div>
    );
  }
}

export default FileProgressBar;