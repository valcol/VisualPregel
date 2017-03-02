import React, {Component} from 'react';
import ProgressBar from './ProgressBar';
import Dropdown from './Dropdown';
import FileSelector from './FileSelector';
import { Form, FormGroup, ControlLabel, Button, FormControl, HelpBlock, InputGroup } from 'react-bootstrap';
import { Provider, connect } from 'react-redux';

let UploadBox = ({label, file, handleUpload, separator, setSeparator, percent, style }) => {
  return (
    <div>
    <FileSelector label={label} file={file} handleUpload={handleUpload}/>
    <Dropdown setSeparator={setSeparator} separator={separator}/>
    <ProgressBar percent={percent} bsStyle={style}/>
    </div>
  );
}

export default UploadBox;
