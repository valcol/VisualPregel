import { Provider, connect } from 'react-redux';
import { setUploadValuesSeparator, setUploadValuesFile, setUploadValuesBar, setNodes, resetUploadValues } from '../actions';
import FileHandler from '../controllers/FileHandler';
import UploadBoxComponent from '../components/UploadBox';

const setValuesFromFile = (e) => {
  return (dispatch, getState) => {
    let file = e.target.files[0];
    if (file) {
      dispatch(setUploadValuesFile(file.name.split(/(\\|\/)/g).pop()));
      if(Object.keys(getState().graph.edges).length === 0) {
        dispatch(setError(("There is no graph to initiate.")));
        dispatch(resetUploadValues());
        return;
      }
      let reader = new FileReader();
      reader.onload = function(evt){
        FileHandler.parsingValues(this.result,
        getState().uploadValues.separator,
        (percent, style) => {dispatch(setUploadValuesBar(style, percent))},
        (nodes) => {dispatch(setNodes(nodes))});
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
    handleUpload: (e) => {
      dispatch(setValuesFromFile(e));
    }
  };
}

const UploadValuesBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadBoxComponent);

export default UploadValuesBox;
