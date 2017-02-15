import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import Dagre from 'dagre';


class Graph extends Component {

  constructor(props) {
    super(props);
    this.init = this.init.bind(this);
  }

  componentDidMount() {
    Fatum.init();
    Fatum.whenReady(this.init);
  }

  init() {
    let nodes = this.props.nodes;
    let canvas = document.getElementById('fatum-canvas');
    window.fatum = Fatum.createFatumContext(canvas);
    Fatum.setRenderingObserver(fatum);
    Fatum.setMouseMoveHandler(canvas, fatum);
    fatum.layerOn(Fatum.MARKS | Fatum.TEXT | Fatum.CONNECTIONS);
    let vertices = [];
    let fonts = fatum.fonts();
    let xVertex = 40;
    let yVertex = 40;
    let vertexSize = 30;

    let listOfGraphNodes = {};
    let layout = this.getLayout(vertexSize);

    for (let node of layout.nodes()) {
      listOfGraphNodes[node] = fatum.addMark().x(layout.node(node).x).y(layout.node(node).y).color(200,100,255).show().alpha(255).width(vertexSize).height(vertexSize);
    }

    for (let edge of layout.edges()){
        fatum.addConnection(listOfGraphNodes[edge.v],listOfGraphNodes[edge.w]).sourceColor([0,0,0,128]).targetColor([0,0,0,128]);
    }

    fatum.camera().zoom(1 , [0, 0]);
    fatum.camera().swap();
    fatum.animate(2000);
  }

  getLayout(vertexSize){
    let g = new Dagre.graphlib.Graph();
    let nodes = this.props.nodes;

    g.setGraph({});

    g.setDefaultEdgeLabel(function() { return {}; });

    for (let nodeID in nodes)
      g.setNode(nodeID, {label:nodeID, width: vertexSize, height: vertexSize});

    for (let nodeID in nodes){
      for (let neighbourID of nodes[nodeID].listOfNeighbours)
        g.setEdge(nodeID, neighbourID);
    }

    Dagre.layout(g);

    return g;
  }

  render() {
    return (
      <div class="graph-container">
        <canvas id="fatum-canvas"></canvas>
      </div>
    );
  }
}
export default Graph;
