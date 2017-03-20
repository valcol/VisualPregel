import ButtonControlComponent from '../components/ButtonControl';
import { switchIsPlaying, goToFirstIndex, goToPreviousIndex, goToNextIndex, goToLastIndex } from '../actions';
import { Provider, connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    isPlaying: state.isPlaying
  };
}

const play = () => {
  return (dispatch, getState) => {
    dispatch(switchIsPlaying());
    let internalCallback = () => {
      if (getState().isPlaying) {
        if (getState().graph.index < getState().graph.graphs.size - 1){
          dispatch(goToNextIndex());
          window.setTimeout(internalCallback, 5000/getState().refreshValue);
        }
        else {
          dispatch(switchIsPlaying());
        }
      }
    };
    window.setTimeout(internalCallback, 5000/getState().refreshValue);
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    goToFirstIndex: () => {
      dispatch(goToFirstIndex());
    },
    goToPreviousIndex: () => {
      dispatch(goToPreviousIndex());
    },
    goToNextIndex: () => {
      dispatch(goToNextIndex());
    },
    goToLastIndex: () => {
      dispatch(goToLastIndex());
    },
    play: () => {
      dispatch(play());
    }
  };
}

const ButtonControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonControlComponent);

export default ButtonControl;
