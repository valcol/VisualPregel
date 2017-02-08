import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

const UploadBox = () =>
  <FormGroup controlId='formControlsFile'>
  <ControlLabel>Upload</ControlLabel>
  <FormControl type="file"/>
  <HelpBlock>"Upload csv..."</HelpBlock>
  
  </FormGroup>
export default UploadBox;
