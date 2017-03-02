import React, {Component} from 'react';
import ProgressBar from '../components/ProgressBar';
import Dropdown from '../components/Dropdown';
import FileSelector from '../components/FileSelector';
import { Form, FormGroup, ControlLabel, Button, FormControl, HelpBlock, InputGroup } from 'react-bootstrap';
import { Provider, connect } from 'react-redux';
import { setUploadGraphSeparator, setUploadGraphFile, setUploadGraphBar, setNodes, resetUploadValues } from '../actions';
import FileHandler from '../controllers/FileHandler';
import UploadBoxComponent from '../components/UploadBox';

const setGraphFromFile = (e) => {
  return (dispatch, getState) => {
    let file = e.target.files[0];
    if (file) {
      dispatch(setUploadGraphFile(file.name.split(/(\\|\/)/g).pop()));
      dispatch(resetUploadValues());
      let reader = new FileReader();
      reader.onload = function(evt){
        FileHandler.parsingGraph(this.result,
           getState().uploadGraph.separator,
           (percent, style) => {dispatch(setUploadGraphBar(style, percent))},
           (graph) => {dispatch(setNodes(graph))}
         );
      };
      reader.readAsText(file);
    }
  };
}

const mapStateToProps = (state) => {
  return state.uploadGraph;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSeparator: (s) => {
      dispatch(setUploadGraphSeparator(s))
    },
    setFile: (file) => {
      dispatch(setUploadGraphFile(file))
    },
    setBar: (style, percent) => {
      dispatch(setUploadGraphBar(percent, style))
    },
    handleUpload: (e) => {
      dispatch(setGraphFromFile(e));
    }
  };
}

const UploadGraphBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadBoxComponent);

export default UploadGraphBox;
