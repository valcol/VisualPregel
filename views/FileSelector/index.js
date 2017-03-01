import React, {Component} from 'react';
import { FormGroup, InputGroup, FormControl, ControlLabel } from 'react-bootstrap';

class FileSelector extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.fileInput.click();
  }

  render() {
    return (
      <FormGroup>
        <ControlLabel>{this.props.label}</ControlLabel>
        <input ref={(input) => { this.fileInput = input; }} type="file" style={{display:'none'}}
          onChange={this.props.handleUpload}/>
        <InputGroup>
          <InputGroup.Addon>Select file :</InputGroup.Addon>
          <FormControl type="text" value={this.props.file} onClick={this.handleClick}/>
        </InputGroup>
      </FormGroup>
    );
  }
}

export default FileSelector;
