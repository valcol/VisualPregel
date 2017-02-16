import React, {Component} from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class UploadBox extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FormGroup >
      <ControlLabel>{this.props.goal}</ControlLabel>
      <FormControl id = {this.props.idName} type="file" onChange={this.props.upload}/>
      <HelpBlock>{this.props.help}</HelpBlock>
      </FormGroup>
    );
  }
}

export default UploadBox;
