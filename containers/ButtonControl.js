import ButtonControlComponent from '../components/ButtonControl';
import { setIndex, setIsPlaying, switchIsPlaying, goToFirstIndex, goToPreviousIndex, goToNextIndex, goToLastIndex, setRefreshValue } from '../actions';
import { Provider, connect } from 'react-redux';

const mapStateToProps = (state) => {
  let canGoBack = state.graph.index > 0;
  let canGoForward = state.graph.index < state.graph.graphs.size - 1;
  return {
    isPlaying: state.isPlaying,
    canGoBack,
    canGoForward,
    size: state.graph.graphs.size-1,
    value: state.graph.index,
    speed: state.refreshValue
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
    },
    setIndex: (index) => {
      dispatch(setIsPlaying(false));
      dispatch(setIndex(index));
    },
    setSpeed: (value) => {
      dispatch(setRefreshValue(value));
    }
  };
}

const ButtonControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonControlComponent);

export default ButtonControl;
