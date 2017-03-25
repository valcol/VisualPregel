import CodeAreaCommponent from '../components/CodeArea';
import { setDispatchFunction, resetDispatchFunction } from '../actions';
import { Provider, connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    title: 'Dispatch',
    code: state.dispatch
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCode: (c) => {
      dispatch(setDispatchFunction(c));
    },
    resetCode: () => {
      dispatch(resetDispatchFunction());
    }
  };
}

const CodeArea = connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeAreaCommponent);

export default CodeArea;
