import GraphCommponent from '../components/Graph';
import { initGraph } from '../actions';
import { Provider, connect } from 'react-redux';
import GraphHelper from '../controllers/GraphHelpers';

const mapStateToProps = (state) => {
  return {
    graph: state.graph.graphs.get(state.graph.index)
  };
}

const setRandomGraph = () => {
  return (dispatch) => {
    let rn = GraphHelper.generateRandomGraph();
    dispatch(initGraph(rn));
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setRandomNodes: () => {
      dispatch(setRandomGraph());
    }
  };
}

const Graph = connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphCommponent);

export default Graph;
