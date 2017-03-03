import PanelCommponent from '../components/Panel';
import { setRandomNodes, setPregelMockFunction } from '../actions';
import { Provider, connect } from 'react-redux';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setRandomNodes: () => {
      dispatch(setRandomNodes());
    },
    setPregelMockFunction: () => {
      dispatch(setPregelMockFunction());
    }
  };
}

const Panel = connect(
  null,
  mapDispatchToProps
)(PanelCommponent);

export default Panel;
