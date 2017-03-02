import React, {Component} from 'react';
import ProgressBar from './ProgressBar';
import Dropdown from './Dropdown';
import FileSelector from './FileSelector';
import { Form, FormGroup, ControlLabel, Button, FormControl, HelpBlock, InputGroup } from 'react-bootstrap';
import { Provider, connect } from 'react-redux';
import { setUploadValuesSeparator, setUploadValuesFile, setUploadValuesBar, setValues, resetUploadValues } from '../actions';
import FileHandler from '../controllers/FileHandler';

const setValuesFromFile = (e) => {
  return (dispatch, getState) => {
    let file = e.target.files[0];
    if (file) {
      dispatch(setUploadValuesFile(file.name.split(/(\\|\/)/g).pop()));
      if(Object.keys(getState().nodes).length === 0) {
        alert("There is no graph to initiate.");
        dispatch(resetUploadValues());
        return;
      }
      let reader = new FileReader();
      reader.onload = function(evt){
        FileHandler.parsingValues(this.result, getState().uploadValues.separator,
           () => {}, (values) => {dispatch(setValues(values))});
      };
      reader.readAsText(file);
    }
  };
}

const mapStateToProps = (state) => {
  return state.uploadValues;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSeparator: (s) => {
      dispatch(setUploadValuesSeparator(s))
    },
    setFile: (file) => {
      dispatch(setUploadValuesFile(file))
    },
    setBar: (style, percent) => {
      dispatch(setUploadValuesBar(percent, style))
    },
    setValues: (e) => {
        console.log('testsdsjd')
      dispatch(setValuesFromFile(e));
    }
  };
}

let UploadValuesBox = ({label, file, setValues, separator, setSeparator, percent, style }) => {
  return (
    <div>
    <FileSelector label={label} file={file} handleUpload={setValues}/>
    <Dropdown setSeparator={setSeparator} separator={separator}/>
    <ProgressBar percent={percent} bsStyle={style}/>
    </div>
  );
}

UploadValuesBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadValuesBox);

export default UploadValuesBox;
