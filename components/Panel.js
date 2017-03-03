import React, {Component} from 'react';
import UploadGraphBox from '../containers/UploadGraphBox';
import UploadValuesBox from '../containers/UploadValuesBox';
import { Button } from 'react-bootstrap';
import { ButtonToolbar, DropdownButton , MenuItem, HelpBlock  } from 'react-bootstrap';
import FileHandler from '../controllers/FileHandler';
import PregelMock from '../containers/PregelMock';

const Panel = ({execute, pregelMock}) => {
  return (
    <div className='panel'>
    <UploadGraphBox idName = "graph" label = "Upload graph file :"/>
    <UploadValuesBox idName="values" label="Upload values file :"/>
    <Button bsSize="large" onClick={execute} block>Generate random graph</Button>
    <PregelMock pregelMock = {pregelMock}/>
    </div>
  );
}

export default Panel;
