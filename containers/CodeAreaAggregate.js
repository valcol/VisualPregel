import CodeAreaCommponent from '../components/CodeArea';
import { setAggregateFunction, resetAggregateFunction } from '../actions';
import { Provider, connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    title: '1. Aggregate',
    code: state.aggregate
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCode: (c) => {
      dispatch(setAggregateFunction(c));
    },
    resetCode: () => {
      dispatch(resetAggregateFunction());
    }
  };
}

const CodeArea = connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeAreaCommponent);

export default CodeArea;
