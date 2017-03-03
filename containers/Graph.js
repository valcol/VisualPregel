import GraphCommponent from '../components/Graph';
import { setRandomNodes } from '../actions';
import { Provider, connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    nodes: state.nodes,
    values: state.values
  };
}

const Graph = connect(
  mapStateToProps
)(GraphCommponent);

export default Graph;
