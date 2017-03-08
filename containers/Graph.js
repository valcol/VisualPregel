import GraphCommponent from '../components/Graph';
import { setRandomNodes } from '../actions';
import { Provider, connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    graph: state.graph
  };
}

const Graph = connect(
  mapStateToProps
)(GraphCommponent);

export default Graph;
