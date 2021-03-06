import React, {Component} from 'react';
import UploadGraphBox from '../containers/UploadGraphBox';
import UploadValuesBox from '../containers/UploadValuesBox';
import { Button } from 'react-bootstrap';
import PregelMock from '../containers/PregelMock';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import { ButtonToolbar, ButtonGroup, Glyphicon, span } from 'react-bootstrap';
import ButtonControl from '../containers/ButtonControl';
import DropdownPreset from './DropdownPreset';

const Panel = ({setRandomNodes, setPregelMockFunction, setNeighboringSummits, setDirectedTriangleCounting, setDefault}) => {
  return (
    <div className='panel'>
    <UploadGraphBox idName = "graph" label = "Upload graph file :"/>
    <UploadValuesBox idName="values" label="Upload values file :"/>
    <DropdownPreset setNeighboringSummits={setNeighboringSummits} setDirectedTriangleCounting={setDirectedTriangleCounting} setDefault={setDefault}/>
    <Button bsSize="large" onClick={setRandomNodes} block>Generate random graph</Button>
    <PregelMock pregelMock = {setPregelMockFunction}/>
    <br></br>
    </div>
  );
}

export default Panel;
