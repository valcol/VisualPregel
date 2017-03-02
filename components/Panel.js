import React, {Component} from 'react';
import UploadGraphBox from '../containers/UploadGraphBox';
import UploadValuesBox from '../containers/UploadValuesBox';
import { Button } from 'react-bootstrap';
import { ButtonToolbar, DropdownButton , MenuItem, HelpBlock  } from 'react-bootstrap';
import FileHandler from '../controllers/FileHandler';

const Panel = ({execute}) => {
  return (
    <div className='panel'>
    <UploadGraphBox idName = "graph" label = "Upload graph file :"/>
    <UploadValuesBox idName="values" label="Upload values file :"/>
    <Button bsSize="large" onClick={execute} block>Generate random graph</Button>
    </div>
  );
}

export default Panel;
