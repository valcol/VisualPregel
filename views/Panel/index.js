import React, {Component} from 'react';
import UploadBox from '../UploadBox';
import FileProgressBar from '../ProgressBar';
import { Button } from 'react-bootstrap';
import { ButtonToolbar, DropdownButton , MenuItem, HelpBlock  } from 'react-bootstrap';
import FileHandler from '../../controllers/FileHandler';

class Panel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      percentFileBar: 0,
      bsStyleFileBar: 'success',
      percentValuesBar: 0,
      bsStyleValuesBar: 'success',
      separator: ','
    };
    this.uploadGraph = this.uploadGraph.bind(this);
    this.uploadValues = this.uploadValues.bind(this);
    this.updateFileBar = this.updateFileBar.bind(this);
    this.updateValuesBar = this.updateValuesBar.bind(this);
    this.setSeparator = this.setSeparator.bind(this);
  }

  updateFileBar(percentFileBar, bsStyleFileBar,){
    this.setState({percentFileBar,
    bsStyleFileBar});
  }

  updateValuesBar(percentValuesBar, bsStyleValuesBar){
    this.setState({percentValuesBar,
    bsStyleValuesBar});
  }

  uploadGraph(e){
    FileHandler.fileToGraph(e.target.files[0], this.updateFileBar, this.props.updateGraph);
  }

  uploadValues(e){
    FileHandler.initValuesFromFile(e.target.files[0], this.updateValuesBar, this.props.updateGraph);
  }

  setSeparator(e){
      this.setState({separator: e});
      FileHandler.separator = e;
  }

  render() {
    return (

    <div>
    <p>Please choose your CSV Seperator : </p>
     <ButtonToolbar>
      <DropdownButton bsStyle="primary" title="CSV Seperator" id="dropdown-size-medium" onSelect={this.setSeparator}>
        <MenuItem eventKey=',' >Comma Seperator ','</MenuItem>
        <MenuItem eventKey='\t' >Colon Seperator '\t'</MenuItem>
        <MenuItem eventKey=';' >Semi-colon Seperator ';'</MenuItem>
      </DropdownButton>
     </ButtonToolbar>
     <HelpBlock> '{this.state.separator}' is the selected separator</HelpBlock>
     <br/>
    <UploadBox idName = "graph" goal = "Upload graph file" help = "Upload csv file" upload={this.uploadGraph}/>
	  <FileProgressBar percent={this.state.percentFileBar} bsStyle = {this.state.bsStyleFileBar}/>
    <UploadBox idName = "values" goal = "Upload values file" help = "Upload csv file" upload={this.uploadValues}/>
    <FileProgressBar percent={this.state.percentValuesBar} bsStyle = {this.state.bsStyleValuesBar}/>
      <Button bsSize="large" onClick={this.props.execute} block>Execute</Button>
    </div>
    );
  }
}

export default Panel;
