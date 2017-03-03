import CodeAreaCommponent from '../components/CodeArea';
import { setInitializeFunction, resetInitializeFunction } from '../actions';
import { Provider, connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    title: '1. Initialize',
    code: state.initialize
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCode: (c) => {
      dispatch(setInitializeFunction(c));
    },
    resetCode: () => {
      dispatch(resetInitializeFunction());
    }
  };
}

const CodeArea = connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeAreaCommponent);

export default CodeArea;
