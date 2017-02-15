import React, {Component} from 'react';
import { Button } from 'react-bootstrap';


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
    let canvas = document.getElementById('fatum-demo');
    window.fatum = Fatum.createFatumContext(canvas);
    Fatum.setRenderingObserver(fatum);
    Fatum.setMouseMoveHandler(canvas, fatum);
    fatum.layerOn(Fatum.MARKS | Fatum.TEXT | Fatum.CONNECTIONS);
    let vertices = [];
    let fonts = fatum.fonts();
    let xVertex = 40;
    let yVertex = 40;
    let vertexSize = 30;
    let tmp = 0;

    let listOfGraphNodes = {};

    for (let nodeID in nodes) {
      listOfGraphNodes[nodeID] = fatum.addMark().x(xVertex+tmp).y(yVertex+tmp).color(200,100,255).show().alpha(255).width(vertexSize).height(vertexSize);
      tmp+=30;
    }

    for (let nodeID in nodes){
      for (let neighbourID of nodes[nodeID].listOfNeighbours)
          fatum.addConnection(listOfGraphNodes[nodeID],listOfGraphNodes[neighbourID]).sourceColor([0,0,0,128]).targetColor([0,0,0,128]);
    }

    fatum.camera().zoom(1 , [0, 0]);
    fatum.camera().swap();
    fatum.animate(2000);
  }

  getLayout(){

  }

  render() {
    return(
      <div>
        <canvas id="fatum-demo" ></canvas>
      </div>
    );
  }
}
export default Graph;
