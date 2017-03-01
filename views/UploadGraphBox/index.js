import React, {Component} from 'react';
import ProgressBar from '../ProgressBar';
import Dropdown from '../Dropdown';
import FileSelector from '../FileSelector';
import { Form, FormGroup, ControlLabel, Button, FormControl, HelpBlock, InputGroup } from 'react-bootstrap';
import { Provider, connect } from 'react-redux';
import { setUploadGraphSeparator, setUploadGraphFile, setUploadGraphBar } from '../../actions';

const mapStateToProps = (state) => {
  return state.uploadGraph;
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSeparator: (s) => {
      dispatch(setUploadGraphSeparator(s))
    },
    setFile: (file) => {
      dispatch(setUploadGraphFile(file))
    },
    setBar: (style, percent) => {
      dispatch(setUploadGraphBar(percent, style))
    }
  };
}

class UploadBox extends Component {

  constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload(e){
    let file = e.target.files[0];
    let fileName = file.name.split(/(\\|\/)/g).pop();
    this.props.setFile(fileName);
    this.props.upload(e.target.files[0], this.props.separator, this.props.setBar);
  }

  render() {
    return (
      <div>
      <FileSelector label="test" file={this.props.file} handleUpload={this.handleUpload}/>
      <Dropdown setSeparator={this.props.setSeparator} separator={this.props.separator}/>
      <ProgressBar percent={this.props.percent} bsStyle={this.props.style}/>
      </div>
    );
  }
}

UploadBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadBox);

export default UploadBox;
