import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import Measure from 'react-measure';
import Dagre from 'dagre';


class Graph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dimensions: {
        width: -1,
        height: -1
      }
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
      this.fatum.clear();
      this.makeGraph(nextProps.nodes);
      this.fatum.animate();
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
    this.makeGraph(nodes);
    this.fatum.animate();
  }

  makeGraph(nodes){
    let listOfGraphNodes = {};
    let listOfGraphLabels = {};
    let layout = this.getLayout(this.vertexSize, nodes);

    for (let node of layout.nodes()) {
      listOfGraphNodes[node] = this.fatum.addMark().x(layout.node(node).x).y(layout.node(node).y).color(200, 100, 255).show().alpha(255).width(this.vertexSize).height(this.vertexSize);
      listOfGraphLabels[node] = this.fatum.addText().text(layout.node(node).label.toString()).x(layout.node(node).x).y(layout.node(node).y).textColor(255, 255, 255, 255).font(0).size(13);
    }

    for (let edge of layout.edges()) {
      this.fatum.addConnection(listOfGraphNodes[edge.v], listOfGraphNodes[edge.w]).sourceColor([0, 0, 0, 128]).targetColor([0, 0, 0, 128]);
    }

    this.fatum.camera().centerBox([0,0,this.state.dimensions.width/2,this.state.dimensions.height/2],0);
    this.fatum.camera().swap();   
  }

  getLayout(vertexSize, nodes){
    let g = new Dagre.graphlib.Graph();

    g.setGraph({});

    g.setDefaultEdgeLabel(function() { return {}; });

    for (let nodeID in nodes)
      g.setNode(nodeID, {label:nodes[nodeID].value, width: vertexSize, height: vertexSize});

    for (let nodeID in nodes){
      for (let neighbourID of nodes[nodeID].listOfNeighbours)
        g.setEdge(nodeID, neighbourID);
    }

    Dagre.layout(g);

    return g;
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
