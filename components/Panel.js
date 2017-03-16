import React, {Component} from 'react';
import UploadGraphBox from '../containers/UploadGraphBox';
import UploadValuesBox from '../containers/UploadValuesBox';
import { Button } from 'react-bootstrap';
import PregelMock from '../containers/PregelMock';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import { ButtonToolbar, ButtonGroup, Glyphicon, span } from 'react-bootstrap';
import RangeSlider from '../containers/RangeSlider';
import ButtonControl from '../containers/ButtonControl';
import ValueDropDown from './ValueDropDown';

const Panel = ({setRandomNodes, setPregelMockFunction, setRefreshValue, refreshValue}) => {
  return (
    <div className='panel'>
    <UploadGraphBox idName = "graph" label = "Upload graph file :"/>
    <UploadValuesBox idName="values" label="Upload values file :"/>
    <Button bsSize="large" onClick={setRandomNodes} block>Generate random graph</Button>
    <PregelMock pregelMock = {setPregelMockFunction}/>
    <ValueDropDown setValue={setRefreshValue} value={refreshValue}/>
    <ButtonControl/>
    <RangeSlider/>


    </div>
  );
}

export default Panel;
