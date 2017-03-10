import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import Measure from 'react-measure';
import GraphHelpers from '../controllers/GraphHelpers';

let canvas = {};
let fatum ={};

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
      if ((nextProps.graph.get("id").get("edges") != this.props.graph.get("id").get("edges"))) {
        //console.log(nextProps.graph.id.edges +' : '+ this.props.graph.id.edges)
      //  console.log('edges');
        console.log(nextProps.graph.get("nodes"));
        this.reset();
        this.updateEdges(nextProps.graph.get("edges")).then(() => {
          this.updateNodesValues(nextProps.graph.get("nodes").toJS());
        }).then(() => {
          this.updateEdgesValues(nextProps.graph.get("edgesMessages").toJS());
        }).then(() => {
          //console.log('animate');
          this.fatum.animate();
        });
      }
      else {
        if (nextProps.graph.get("id").get("nodes") != this.props.graph.get("id").get("nodes")) {
                //  console.log('nodes');
          this.updateNodesValues(nextProps.graph.get("nodes").toJS());
          this.fatum.refresh();
        }
        if (nextProps.graph.get("id").get("edgesMessages") != this.props.graph.get("id").get("edgesMessages")){
          this.updateEdgesValues(nextProps.graph.get("edgesMessages").toJS());
          this.fatum.refresh();
        }
      }
  }

  zoomHandler(event) {
    var delta = Math.sign(event.deltaY);
    // compute mouse position on canvas
    var rect = canvas.getBoundingClientRect();
    var zoomX = event.pageX - (rect.left + window.scrollX);
    var zoomY = canvas.height - (event.pageY - (rect.top + window.scrollY));
    // perform zoom
    fatum.camera().zoom(1.0 - 0.1*delta , [zoomX, zoomY]);
    // swap camera to avoid animation
    fatum.camera().swap();
    // rerender with the zoomed camera
    fatum.animate();
    // prevent scrolling
    event.preventDefault();
}


  init() {
    let nodes = this.props.nodes;
    canvas = document.getElementById('fatum-canvas');
    fatum = this.fatum = Fatum.createFatumContext(canvas);
    canvas.onmousewheel = this.zoomHandler;
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

                  console.log("//////////////////");
    console.log(this.layout);
    console.log("//////////////////");
      edges.entrySeq().forEach(([key, value]) => {
         if (!(value.get('to') in fatumNodes)) {
          fatumNodes[value.get('to')] = this.fatum.addMark().x(this.layout.node(value.get('to')).x).y(this.layout.node(value.get('to')).y).color(217,83,79).show().alpha(255).width(this.vertexSize).height(this.vertexSize);
          fatumNodesLabels[value.get('to')] = this.fatum.addText().text('').x(this.layout.node(value.get('to')).x).y(this.layout.node(value.get('to')).y).textColor(0, 0, 0, 255).font(0).size(13);
        }
        if (!(value.get('from') in fatumNodes)) {
          fatumNodes[value.get('from')] = this.fatum.addMark().x(this.layout.node(value.get('from')).x).y(this.layout.node(value.get('from')).y).color(217,83,79).show().alpha(255).width(this.vertexSize).height(this.vertexSize);
          fatumNodesLabels[value.get('from')] = this.fatum.addText().text('').x(this.layout.node(value.get('from')).x).y(this.layout.node(value.get('from')).y).textColor(0, 255, 255, 255).font(0).size(13);
        }
        let point = GraphHelpers.getMidpoint(this.layout.node(value.get('from')).x, this.layout.node(value.get('to')).x, this.layout.node(value.get('from')).y, this.layout.node(value.get('to')).y);
        fatumEdges[key] = this.fatum.addConnection(fatumNodes[value.get('from')], fatumNodes[value.get('to')]).sourceColor([0, 0, 0, 128]).targetColor([0, 0, 0, 128]);
        fatumEdgesLabels[key] = this.fatum.addText().text('').x(point.x).y(point.y).textColor(0, 0, 0, 255).font(0).size(13);

      });

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
