import PanelCommponent from '../components/Panel';
import { setRandomNodes } from '../actions';
import { Provider, connect } from 'react-redux';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setRandomNodes: () => {
      dispatch(setRandomNodes());
    }
  };
}

const Panel = connect(
  mapDispatchToProps
)(PanelCommponent);

export default Panel;
