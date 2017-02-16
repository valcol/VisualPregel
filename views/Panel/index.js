import React, {Component} from 'react';
import UploadBox from '../UploadBox';
import FileProgressBar from '../ProgressBar';
import { Button } from 'react-bootstrap';
import FileHandler from '../../controllers/FileHandler';

class Panel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      bsStyle: 'success'
    };
    this.upload = this.upload.bind(this);
    this.updateBar = this.updateBar.bind(this);
  }

  updateBar(percent, bsStyle){
    console.log(percent);
    this.setState({percent,
    bsStyle});
  }

  upload(e){
    FileHandler.fileToGraph(e.target.files[0], this.updateBar);
  }

  render() {
    return (
    <div>
      <UploadBox upload={this.upload}/>
      <FileProgressBar percent={this.state.percent} bsStyle = {this.state.bsStyle}/>
      <Button bsSize="large" onClick={this.props.execute} block>Execute</Button>
    </div>
    );
  }
}

export default Panel;
