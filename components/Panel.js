import React, {Component} from 'react';
import UploadGraphBox from '../containers/UploadGraphBox';
import UploadValuesBox from '../containers/UploadValuesBox';
import { Button } from 'react-bootstrap';
import PregelMock from '../containers/PregelMock';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import { ButtonToolbar, ButtonGroup, Glyphicon, span } from 'react-bootstrap';
import RangeSlider from '../containers/RangeSlider';
import ValueDropDown from './ValueDropDown';

const Panel = ({setRandomNodes, setPregelMockFunction, BackFast, Back, Play, ForwardFast, Forward, value, setValue}) => {
  return (
    <div className='panel'>
    <UploadGraphBox idName = "graph" label = "Upload graph file :"/>
    <UploadValuesBox idName="values" label="Upload values file :"/>
    <Button bsSize="large" onClick={setRandomNodes} block>Generate random graph</Button>
    <PregelMock pregelMock = {setPregelMockFunction}/>

    
    <ValueDropDown setValue={setValue} value={value}/>

       <ButtonToolbar>
           <ButtonGroup>
             <Button bsSize="xsmall" eventKey='1' onClick={BackFast}>
                <span class="glyphicon glyphicon-backward"></span>BackFast
             </Button>
             <Button bsSize="xsmall" eventKey='2' onClick={Back}>
               <span class="glyphicon glyphicon-triangle-left" aria-label="Left Align"></span>Back
             </Button>
             <Button bsSize="xsmall" eventKey='3' onClick={Play}>
               <span class="glyphicon glyphicon-play"></span> Play
             </Button>
             <Button bsSize="xsmall" eventKey='4' onClick={Forward}>
               <span class="glyphicon glyphicon-forward"></span> Forward
             </Button>
             <Button bsSize="xsmall" eventKey='5' onClick={ForwardFast}>
              <span class="glyphicon glyphicon-triangle-right"></span> Forward Fast
             </Button>
           </ButtonGroup>
      </ButtonToolbar>

  <RangeSlider />

    </div>
  );
}

export default Panel;
