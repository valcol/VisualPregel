import RangeSliderComponent from '../components/RangeSlider';
import { setNodesWithIndex } from '../actions';
import { Provider, connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    graph: state.graph
  };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setNodesWithIndex: (index) => {
      dispatch(setNodesWithIndex(index, true));
    }
  };
}

const RangeSlider = connect(
  mapStateToProps,
  mapDispatchToProps
)(RangeSliderComponent);

export default RangeSlider;
