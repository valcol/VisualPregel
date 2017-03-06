import PanelCommponent from '../components/Panel';
import { setRandomNodes, setPregelMockFunction, setNodes, setEdgesMessages } from '../actions';
import { Provider, connect } from 'react-redux';
import Pregel from '../controllers/Pregel';
import Helpers from '../controllers/Helpers';

const pregel = (e) => {
  return (dispatch, getState) => {
    Pregel.initialize = Helpers.stringToFunction(getState().initialize);
    Pregel.aggregate = Helpers.stringToFunction(getState().aggregate);
    Pregel.dispatch = Helpers.stringToFunction(getState().dispatch);
    Pregel.start(getState().edges, getState().nodes,
    (nodes) => {dispatch(setNodes(nodes))},
    (edgesMessages) => {dispatch(setEdgesMessages(edgesMessages))});
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setRandomNodes: () => {
      dispatch(setRandomNodes());
    },
    setPregelMockFunction: () => {
      dispatch(pregel());
    }
  };
}

const Panel = connect(
  null,
  mapDispatchToProps
)(PanelCommponent);

export default Panel;
