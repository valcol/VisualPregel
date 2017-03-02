import React, {Component} from 'react';
import ProgressBar from './ProgressBar';
import Dropdown from './Dropdown';
import FileSelector from './FileSelector';
import { Form, FormGroup, ControlLabel, Button, FormControl, HelpBlock, InputGroup } from 'react-bootstrap';
import { Provider, connect } from 'react-redux';
import { setUploadGraphSeparator, setUploadGraphFile, setUploadGraphBar, setNodes, resetUploadValues } from '../actions';
import FileHandler from '../controllers/FileHandler';

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
    setNodes: (e) => {
      dispatch(setGraphFromFile(e));
    }
  };
}

let UploadGraphBox = ({label, file, setNodes, separator, setSeparator, percent, style }) => {
  return (
    <div>
    <FileSelector label={label} file={file} handleUpload={setNodes}/>
    <Dropdown setSeparator={setSeparator} separator={separator}/>
    <ProgressBar percent={percent} bsStyle={style}/>
    </div>
  );
}

UploadGraphBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadGraphBox);

export default UploadGraphBox;
