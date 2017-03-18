import PanelComponent from '../components/Panel';
import { setRandomNodes, setPregelMockFunction, setNodes, setEdgesMessages, initGraph, setRefreshValue } from '../actions';
import { Provider, connect } from 'react-redux';
import Pregel from '../controllers/Pregel';
import Helpers from '../controllers/Helpers';
import GraphHelper from '../controllers/GraphHelpers';
import { setInitializeFunction, setAggregateFunction, setDispatchFunction } from '../actions';

const pregel = (e) => {
  return (dispatch, getState) => {
    Pregel.initialize = Helpers.stringToFunction(getState().initialize);
    Pregel.aggregate = Helpers.stringToFunction(getState().aggregate);
    Pregel.dispatch = Helpers.stringToFunction(getState().dispatch);
    Pregel.start(getState().graph.graphs.get(getState().graph.index).get("edges"),getState().graph.graphs.get(getState().graph.index).get("nodes"),
    (nodes) => {dispatch(setNodes(nodes))},
    (edgesMessages) => {dispatch(setEdgesMessages(edgesMessages))},
    1000);
  };
}

const setRandomGraph = () => {
  return (dispatch) => {
    let rn = GraphHelper.generateRandomGraph();
    dispatch(initGraph(rn));
  };
};

const mapStateToProps = (state) => {
  return {
    refreshValue: state.refreshValue
  };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setRandomNodes: () => {
      dispatch(setRandomGraph());
    },
    setPregelMockFunction: () => {
      dispatch(pregel());
    },
    setRefreshValue: (value) => {
      dispatch(setRefreshValue(value));
    },
    setNeighboringSummits: () => {
      dispatch(setInitializeFunction(Helpers.functionToString(Pregel.initializeNeighboringSummits)));
      dispatch(setDispatchFunction(Helpers.functionToString(Pregel.dispatchNeighboringSummits)));
      dispatch(setAggregateFunction(Helpers.functionToString(Pregel.aggregateNeighboringSummits)));
    },
    setTriangleCounting: () => {
      dispatch(setInitializeFunction(Helpers.functionToString(Pregel.initializeTriangleCounting)));
      dispatch(setDispatchFunction(Helpers.functionToString(Pregel.dispatchTriangleCounting)));
      dispatch(setAggregateFunction(Helpers.functionToString(Pregel.aggregateTriangleCounting)));
    },
    setDefault: () => {
      dispatch(setInitializeFunction(Helpers.functionToString(Pregel.initializeBase)));
      dispatch(setDispatchFunction(Helpers.functionToString(Pregel.dispatchBase)));
      dispatch(setAggregateFunction(Helpers.functionToString(Pregel.aggregateBase)));
    }
  };
}

const Panel = connect(
  mapStateToProps,
  mapDispatchToProps
)(PanelComponent);

export default Panel;
