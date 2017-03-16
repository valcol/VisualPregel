import ButtonControlComponent from '../components/ButtonControl';
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
      dispatch(setNodesWithIndex(index, false));
    }
  };
}

const ButtonControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonControlComponent);

export default ButtonControl;
