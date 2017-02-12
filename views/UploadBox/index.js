import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';


const UploadBox = () =>
  <FormGroup controlId='formControlsFile'>
  <ControlLabel>Upload</ControlLabel>
  <FormControl type="file" onChange={(e) => fileToGraph(e.target.files[0])}/>
  <HelpBlock>"Upload csv..."</HelpBlock>
  </FormGroup>
    
  
  
export default UploadBox;