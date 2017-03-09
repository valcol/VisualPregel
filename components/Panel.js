import React, {Component} from 'react';
import UploadGraphBox from '../containers/UploadGraphBox';
import UploadValuesBox from '../containers/UploadValuesBox';
import { Button } from 'react-bootstrap';
import PregelMock from '../containers/PregelMock';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import { ButtonToolbar, ButtonGroup, Glyphicon, span } from 'react-bootstrap';

const Panel = ({setRandomNodes, setPregelMockFunction, Return, Play, Stop}) => {
  return (
    <div className='panel'>
    <UploadGraphBox idName = "graph" label = "Upload graph file :"/>
    <UploadValuesBox idName="values" label="Upload values file :"/>
    <Button bsSize="large" onClick={setRandomNodes} block>Generate random graph</Button>
    <PregelMock pregelMock = {setPregelMockFunction}/>

    <div className='panel'>
       <ButtonToolbar>
           <ButtonGroup>
             <Button bsSize="lg" eventKey='1' onClick={Return}>
               <span class="glyphicon glyphicon-triangle-left" aria-label="Left Align"></span> Return
             </Button>
             <Button bsSize="lg" eventKey='2' onClick={Stop}>
               <span class="glyphicons glyphicons-pause" aria-label="Left Align"></span> Stop
             </Button>
             <Button bsSize="lg" eventKey='3' onClick={Play}>
               <span class="glyphicons glyphicons-play" aria-label="Left Align"></span> Play
             </Button>
           </ButtonGroup>
      </ButtonToolbar>
   </div>

    </div>
  );
}

export default Panel;
