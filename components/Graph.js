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
      if (!this.fatum.isAnimating() && (nextProps.edges !== this.props.edges)) {
        this.fatum.clear();
        this.updateEdges(nextProps.edges);
        this.fatum.animate();
      }
      if (nextProps.nodes !== this.props.nodes){
        this.updateNodesValues(nextProps.nodes);
        this.fatum.refresh();
      }
      if (nextProps.edgesMessages !== this.props.edgesMessages){
        this.updateEdgesValues(nextProps.edgesMessages);
        this.fatum.refresh();
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
    this.updateEdges(this.props.edges);
    this.updateNodesValues(this.props.nodes);
    this.fatum.animate();
  }

  reset() {
    this.fatum.clear();
    let fatumNodesLabels = {};
    let fatumNodes = {};
    let fatumEdgesLabels = {};
    let fatumEdges = {};
    this.setState({fatumNodesLabels, fatumNodes, fatumEdgesLabels, fatumEdges});
  }

  updateEdges(edges) {
    let fatumNodesLabels = {};
    let fatumNodes = {};
    let fatumEdgesLabels = {};
    let fatumEdges = {};
    this.layout = GraphHelpers.getLayout(this.vertexSize, edges);

    for (let edge in edges) {
      if (!(edges[edge].to in fatumNodes)) {
        fatumNodes[edges[edge].to] = this.fatum.addMark().x(this.layout.node(edges[edge].to).x).y(this.layout.node(edges[edge].to).y).color(200, 100, 255).show().alpha(255).width(this.vertexSize).height(this.vertexSize);
        fatumNodesLabels[edges[edge].to] = this.fatum.addText().text('').x(this.layout.node(edges[edge].to).x).y(this.layout.node(edges[edge].to).y).textColor(0, 0, 0, 255).font(0).size(13);
      }
      if (!(edges[edge].from in fatumNodes)) {
        fatumNodes[edges[edge].from] = this.fatum.addMark().x(this.layout.node(edges[edge].from).x).y(this.layout.node(edges[edge].from).y).color(200, 100, 255).show().alpha(255).width(this.vertexSize).height(this.vertexSize);
        fatumNodesLabels[edges[edge].from] = this.fatum.addText().text('').x(this.layout.node(edges[edge].from).x).y(this.layout.node(edges[edge].from).y).textColor(0, 0, 0, 255).font(0).size(13);
      }
      let point = GraphHelpers.getMidpoint(this.layout.node(edges[edge].from).x, this.layout.node(edges[edge].to).x, this.layout.node(edges[edge].from).y, this.layout.node(edges[edge].to).y);
      fatumEdges[edge] = this.fatum.addConnection(fatumNodes[edges[edge].from], fatumNodes[edges[edge].to]).sourceColor([0, 0, 0, 128]).targetColor([0, 0, 0, 128]);
      fatumEdgesLabels[edge] = this.fatum.addText().text('').x(point.x).y(point.y).textColor(0, 0, 0, 255).font(0).size(13);
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
          fatumNodesLabels[node].text(JSON.stringify(values[node]));
      }
    }
  }

  updateEdgesValues(values){
    let fatumEdgesLabels = this.state.fatumEdgesLabels;
    for (let edge in values) {
      let point = GraphHelpers.getMidpoint(this.layout.node(this.props.edges[edge].from).x, this.layout.node(this.props.edges[edge].to).x,
      this.layout.node(this.props.edges[edge].from).y, this.layout.node(this.props.edges[edge].to).y);
      if (values.hasOwnProperty(edge)) {
        if (fatumEdgesLabels.hasOwnProperty(edge))
          fatumEdgesLabels[edge].text(JSON.stringify(values[edge]));
      }
    }
    this.fatum.refresh();
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
