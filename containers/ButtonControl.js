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
    console.log('play');
    dispatch(switchIsPlaying());
    let internalCallback = () => {
      console.log('calllll '+getState().isPlaying)
      if (getState().isPlaying) {
          window.setTimeout(internalCallback, 1000);
          dispatch(goToNextIndex());
      }
    };
    window.setTimeout(internalCallback, 1000);
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
