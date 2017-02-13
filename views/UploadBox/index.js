import React, {Component} from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class UploadBox extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FormGroup controlId='formControlsFile'>
      <ControlLabel>Upload</ControlLabel>
      <FormControl type="file" onChange={this.props.upload}/>
      <HelpBlock>"Upload csv..."</HelpBlock>
      </FormGroup>
    );
  }
}

export default UploadBox;
