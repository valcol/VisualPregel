import React, {Component} from 'react';
import UploadGraphBox from '../containers/UploadGraphBox';
import UploadValuesBox from '../containers/UploadValuesBox';
import { Button } from 'react-bootstrap';
import PregelMock from '../containers/PregelMock';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import { ButtonToolbar, ButtonGroup, Glyphicon, span } from 'react-bootstrap';
import RangeSlider from '../containers/RangeSlider';

const Panel = ({setRandomNodes, setPregelMockFunction, BackFast, Back, Play, ForwardFast, Forward}) => {
  return (
    <div className='panel'>
    <UploadGraphBox idName = "graph" label = "Upload graph file :"/>
    <UploadValuesBox idName="values" label="Upload values file :"/>
    <Button bsSize="large" onClick={setRandomNodes} block>Generate random graph</Button>
    <PregelMock pregelMock = {setPregelMockFunction}/>



    <FormGroup controlId="formControlsSelectValue">
      <InputGroup>
     <InputGroup.Addon>Select value :</InputGroup.Addon>
      <FormControl componentClass="select" placeholder="select" >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </FormControl>
    </InputGroup>
    </FormGroup>



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
