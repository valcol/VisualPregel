import React, {Component} from 'react';
import UploadGraphBox from '../containers/UploadGraphBox';
import UploadValuesBox from '../containers/UploadValuesBox';
import { Button } from 'react-bootstrap';
import PregelMock from '../containers/PregelMock';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import { ButtonToolbar, ButtonGroup, Glyphicon, span } from 'react-bootstrap';
import RangeSlider from '../containers/RangeSlider';
import ButtonControl from '../containers/ButtonControl';

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

    <ButtonControl/>
    <RangeSlider/>

    </div>
  );
}

export default Panel;
