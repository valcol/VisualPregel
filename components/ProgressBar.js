import React, {Component} from 'react';
import { FormGroup, ProgressBar, Button } from 'react-bootstrap';

const FileProgressBar = ({ percent, bsStyle}) => {
  return (
    <ProgressBar active now={percent} bsStyle={bsStyle} label={percent + '%' } />
  );
}

export default FileProgressBar;
