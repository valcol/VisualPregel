import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import Measure from 'react-measure';
import GraphHelpers from '../controllers/GraphHelpers';

class Graph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dimensions: {
        width: -1,
        height: -1
      },
      fatumNodesLabels: {},
      fatumNodes: {},
      fatumEdgesLabels: {},
      fatumEdges: {}
    };
    this.vertexSize = 30;
    this.fonts = null;
    this.init = this.init.bind(this);
  }

  componentDidMount() {
    Fatum.init();
    Fatum.whenReady(this.init);
    this.fonts = this.fatum.fonts();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.fatum.isAnimating()) {
      if (nextProps.nodes !== this.props.nodes) {
        this.fatum.clear();
        this.updateGraph(nextProps.nodes);
        this.fatum.animate();
      } else if (nextProps.values !== this.props.values){
        if (Object.keys(nextProps.values).length > 0)
        this.updateNodesValues(nextProps.values);
        this.fatum.animate();
      }
    }
  }

  init() {
    let nodes = this.props.nodes;
    let canvas = document.getElementById('fatum-canvas');
    this.fatum = Fatum.createFatumContext(canvas);
    Fatum.setRenderingObserver(this.fatum);
    Fatum.setMouseMoveHandler(canvas, this.fatum);
  //  Fatum.setCanvasSize(500, 500, true);
    this.fatum.layerOn(Fatum.MARKS | Fatum.TEXT | Fatum.CONNECTIONS);
    let vertices = [];
    this.updateGraph(nodes);
    this.fatum.animate();
  }

  updateGraph(nodes) {
    let fatumNodesLabels = {};
    let fatumNodes = {};
    let fatumEdgesLabels = {};
    let fatumEdges = {};

    let layout = GraphHelpers.getLayout(this.vertexSize, nodes);

    for (let nodeID of layout.nodes()) {
      fatumNodes[nodeID] = this.fatum.addMark().x(layout.node(nodeID).x).y(layout.node(nodeID).y).color(200, 100, 255).show().alpha(255).width(this.vertexSize).height(this.vertexSize);
      fatumNodesLabels[nodeID] = this.fatum.addText().text('').x(layout.node(nodeID).x).y(layout.node(nodeID).y).textColor(0, 0, 0, 255).font(0).size(13);
    }

    for (let edge of layout.edges()) {
      let edgeProps = layout.edge(edge);
      let point = GraphHelpers.getMidpoint(layout.node(edge.v).x, layout.node(edge.w).x, layout.node(edge.v).y, layout.node(edge.w).y);
      fatumEdges[edge] = this.fatum.addConnection(fatumNodes[edge.v], fatumNodes[edge.w]).sourceColor([0, 0, 0, 128]).targetColor([0, 0, 0, 128]);
      fatumEdgesLabels[edge] = this.fatum.addText().text("2").x(edgeProps.x).y(edgeProps.y).textColor(0, 0, 0, 255).font(0).size(13);
    }

    this.fatum.camera().zoom(1, [0, 0]);
    this.fatum.camera().swap();
    this.setState({fatumNodesLabels, fatumNodes, fatumEdgesLabels, fatumEdges});
  }

  updateNodesValues(values){
    let fatumNodesLabels = this.state.fatumNodesLabels;
    for (let node in values) {
      if (values.hasOwnProperty(node)) {
        if (fatumNodesLabels.hasOwnProperty(node))
        fatumNodesLabels[node].text(values[node].toString());
      }
    }
  }

  updateEdgesValues(values){
    let fatumEdgesLabels = this.state.fatumEdgesLabels;
    for (let node in values) {
      if (values.hasOwnProperty(node)) {
        if (fatumEdgesLabels.hasOwnProperty(node))
        listOfGraphLabels[node].text(values[node].toString());
      }
    }
  }


  render() {
    const { width, height } = this.state.dimensions;
    return (
      <Measure
        onMeasure={(dimensions) => {
          this.setState({dimensions})
        }
      }
      >
      <div className="graph-container">
        <div className='graph-area-header'>
          Graph
        </div>
          <canvas id="fatum-canvas" width={'500px'} height={'500px'}></canvas>
      </div>
    </Measure>
    );
  }
}
export default Graph;
