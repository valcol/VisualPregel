import GraphCommponent from '../components/Graph';
import { setRandomNodes } from '../actions';
import { Provider, connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    edges: state.edges,
    nodes: state.nodes,
    edgesMessages: state.edgesMessages
  };
}

const Graph = connect(
  mapStateToProps
)(GraphCommponent);

export default Graph;
