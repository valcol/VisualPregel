import React, {Component} from 'react';
import UploadGraphBox from '../UploadGraphBox';
import UploadValuesBox from '../UploadValuesBox';
import { Button } from 'react-bootstrap';
import { ButtonToolbar, DropdownButton , MenuItem, HelpBlock  } from 'react-bootstrap';
import FileHandler from '../../controllers/FileHandler';

class Panel extends Component {

  constructor(props) {
    super(props);
    this.uploadGraph = this.uploadGraph.bind(this);
    this.uploadValues = this.uploadValues.bind(this);
  }

  uploadGraph(file, separator, update){
    FileHandler.fileToGraph(file, separator,
       update, this.props.updateGraph);
    update(0, 'info');
  }

  uploadValues(file, separator, update){
    FileHandler.initValuesFromFile(file, separator, update, this.props.updateValues);
  }

  render() {
    return (
    <div className='panel'>
    <UploadGraphBox idName = "graph" label = "Upload graph file :" upload={this.uploadGraph}/>
    <UploadValuesBox idName = "values" label = "Upload values file :" upload={this.uploadValues}/>
    <Button bsSize="large" onClick={this.props.execute} block>Generate random graph</Button>
    </div>
    );
  }
}

export default Panel;
