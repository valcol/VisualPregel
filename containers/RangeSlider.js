import RangeSliderComponent from '../components/RangeSlider';
import { setNodesWithIndex } from '../actions';
import { Provider, connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    size: state.graph.graphs.size-1,
    value: state.graph.index
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setIndex: (index) => {
      dispatch(setNodesWithIndex(index));
    }
  };
}

const RangeSlider = connect(
  mapStateToProps,
  mapDispatchToProps
)(RangeSliderComponent);

export default RangeSlider;
