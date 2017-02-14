import React, {Component} from 'react';
import FatumGraph from '../FatumGraph';
import { Button } from 'react-bootstrap';


class Graph extends Component {

  render(){
    return(
      <div>
        <canvas id="fatum-demo" ></canvas>
        <Button bsSize="large" onClick={FatumGraph.fatumgraph} block>Execute</Button>
      </div>
    );
  }
}
export default Graph;
