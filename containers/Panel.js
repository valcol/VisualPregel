import PanelCommponent from '../components/Panel';
import { setRandomNodes, setPregelMockFunction, setNodes, setEdgesMessages, setEdges } from '../actions';
import { Provider, connect } from 'react-redux';
import Pregel from '../controllers/Pregel';
import Helpers from '../controllers/Helpers';
import GraphHelper from '../controllers/GraphHelpers';

const pregel = (e) => {
  return (dispatch, getState) => {
    Pregel.initialize = Helpers.stringToFunction(getState().initialize);
    Pregel.aggregate = Helpers.stringToFunction(getState().aggregate);
    Pregel.dispatch = Helpers.stringToFunction(getState().dispatch);
    Pregel.start(getState().graph.edges, getState().graph.nodes,
    (nodes) => {dispatch(setNodes(nodes))},
    (edgesMessages) => {dispatch(setEdgesMessages(edgesMessages))});
  };
}

const setRandomGraph = () => {
  return (dispatch) => {
    let rn = GraphHelper.generateRandomGraph();
    dispatch(setNodes(rn.nodes));
    dispatch(setEdges(rn.edges));
    dispatch(setEdgesMessages(rn.edgesMessages));
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setRandomNodes: () => {
      dispatch(setRandomGraph());
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
