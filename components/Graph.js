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
    if (!this.fatum.isAnimating())
      if ((nextProps.graph.id.edges != this.props.graph.id.edges)) {
        //console.log(nextProps.graph.id.edges +' : '+ this.props.graph.id.edges)
      //  console.log('edges');
        console.log(nextProps.graph.nodes);
        this.reset();
        this.updateEdges(nextProps.graph.edges).then(() => {
          this.updateNodesValues(nextProps.graph.nodes);
        }).then(() => {
          this.updateEdgesValues(nextProps.graph.edgesMessages);
        }).then(() => {
          //console.log('animate');
          this.fatum.animate();
        });
      }
      else {
        if (nextProps.graph.id.nodes != this.props.graph.id.nodes) {
                //  console.log('nodes');
          this.updateNodesValues(nextProps.graph.nodes);
          this.fatum.refresh();
        }
        if (nextProps.graph.id.edgesMessages != this.props.graph.id.edgesMessages){
          this.updateEdgesValues(nextProps.graph.edgesMessages);
          this.fatum.refresh();
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
    this.props.setRandomNodes();
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
    return new Promise((resolve, reject) => {
      let fatumNodesLabels = {};
      let fatumNodes = {};
      let fatumEdgesLabels = {};
      let fatumEdges = {};
      this.layout = GraphHelpers.getLayout(this.vertexSize, edges);

      for (let edge in edges) {
        if (!(edges[edge].to in fatumNodes)) {
          fatumNodes[edges[edge].to] = this.fatum.addMark().x(this.layout.node(edges[edge].to).x).y(this.layout.node(edges[edge].to).y).color(217,83,79).show().alpha(255).width(this.vertexSize).height(this.vertexSize);
          fatumNodesLabels[edges[edge].to] = this.fatum.addText().text('').x(this.layout.node(edges[edge].to).x).y(this.layout.node(edges[edge].to).y).textColor(0, 0, 0, 255).font(0).size(13);
        }
        if (!(edges[edge].from in fatumNodes)) {
          fatumNodes[edges[edge].from] = this.fatum.addMark().x(this.layout.node(edges[edge].from).x).y(this.layout.node(edges[edge].from).y).color(217,83,79).show().alpha(255).width(this.vertexSize).height(this.vertexSize);
          fatumNodesLabels[edges[edge].from] = this.fatum.addText().text('').x(this.layout.node(edges[edge].from).x).y(this.layout.node(edges[edge].from).y).textColor(0, 255, 255, 255).font(0).size(13);
        }
        let point = GraphHelpers.getMidpoint(this.layout.node(edges[edge].from).x, this.layout.node(edges[edge].to).x, this.layout.node(edges[edge].from).y, this.layout.node(edges[edge].to).y);
        fatumEdges[edge] = this.fatum.addConnection(fatumNodes[edges[edge].from], fatumNodes[edges[edge].to]).sourceColor([0, 0, 0, 128]).targetColor([0, 0, 0, 128]);
        fatumEdgesLabels[edge] = this.fatum.addText().text('').x(point.x).y(point.y).textColor(0, 0, 0, 255).font(0).size(13);
      }

      this.fatum.camera().zoom(1, [0, 0]);
      this.fatum.camera().swap();
      this.setState({fatumNodesLabels, fatumNodes, fatumEdgesLabels, fatumEdges});
      resolve();
    });
  }

  updateNodesValues(values){
    let fatumNodesLabels = this.state.fatumNodesLabels;
    let fatumNodes = this.state.fatumNodes;
    for (let node in values) {
      if (values.hasOwnProperty(node)) {
        if (fatumNodesLabels.hasOwnProperty(node)) {
          fatumNodesLabels[node].text(JSON.stringify(values[node].value));
        }
        if (fatumNodes.hasOwnProperty(node))
          if (!(values[node].isActive))
            fatumNodes[node].color(92,184,92).show();
          else
            fatumNodes[node].color(217,83,79).show();
      }
    }
    this.fatum.refresh();
  }

  updateEdgesValues(values){
    let fatumEdgesLabels = this.state.fatumEdgesLabels;
    for (let edge in fatumEdgesLabels) {
      if (values.hasOwnProperty(edge)) {
        if (fatumEdgesLabels.hasOwnProperty(edge))
          fatumEdgesLabels[edge].text(JSON.stringify(values[edge]));
      }
      else {
        fatumEdgesLabels[edge].text('');
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
