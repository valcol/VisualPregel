import React, {Component} from 'react';
import { FormGroup, InputGroup, FormControl, ControlLabel } from 'react-bootstrap';

const FileSelector = ({label, handleUpload, file}) => {
  let fileInput;
  return (
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      <input ref={(input) => { fileInput = input; }} type="file" style={{display:'none'}}
        accept='.csv,.txt' onChange={handleUpload}/>
      <InputGroup>
        <InputGroup.Addon>Select file :</InputGroup.Addon>
        <FormControl type="text" value={file} onClick={() => { fileInput.click() }}/>
      </InputGroup>
    </FormGroup>
  );
}

export default FileSelector;
