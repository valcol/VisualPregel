import ButtonControlComponent from '../components/ButtonControl';
import { switchIsPlaying, goToFirstIndex, goToPreviousIndex, goToNextIndex, goToLastIndex } from '../actions';
import { Provider, connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    isPlaying: state.isPlaying
  };
}

const play = () => {
  console.log('play');
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
      dispatch(switchIsPlaying());
    }
  };
}

const ButtonControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonControlComponent);

export default ButtonControl;
