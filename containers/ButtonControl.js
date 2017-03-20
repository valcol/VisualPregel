import ButtonControlComponent from '../components/ButtonControl';
import { setIsPlaying, switchIsPlaying, goToFirstIndex, goToPreviousIndex, goToNextIndex, goToLastIndex } from '../actions';
import { Provider, connect } from 'react-redux';

const mapStateToProps = (state) => {
  let canGoBack = state.graph.index > 0;
  let canGoForward = state.graph.index < state.graph.graphs.size - 1;
  return {
    isPlaying: state.isPlaying,
    canGoBack,
    canGoForward
  };
}

const play = () => {
  return (dispatch, getState) => {
    dispatch(switchIsPlaying());
    let internalCallback = () => {
      if (getState().isPlaying) {
        if (getState().graph.index < getState().graph.graphs.size - 1){
          dispatch(goToNextIndex());
          window.setTimeout(internalCallback, 3000/getState().refreshValue);
        }
        else {
          dispatch(setIsPlaying(false));
        }
      }
    };
    window.setTimeout(internalCallback, 3000/getState().refreshValue);
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    goToFirstIndex: () => {
      dispatch(setIsPlaying(false));
      dispatch(goToFirstIndex());
    },
    goToPreviousIndex: () => {
      dispatch(setIsPlaying(false));
      dispatch(goToPreviousIndex());
    },
    goToNextIndex: () => {
      dispatch(setIsPlaying(false));
      dispatch(goToNextIndex());
    },
    goToLastIndex: () => {
      dispatch(setIsPlaying(false));
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
