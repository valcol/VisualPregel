import React from 'react';
import { FormGroup, ProgressBar } from 'react-bootstrap';


const FileProgressBar = () =>
   <ProgressBar now={now} bsStyle="success" label={`${now}%`} />
  
  
export default FileProgressBar;