import React, {Component} from 'react';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ButtonToolbar, ButtonGroup, Glyphicon, span } from 'react-bootstrap';

class ButtonControl extends Component {

  render() {
    let setNodesWithIndex = this.props.setNodesWithIndex.bind(this);
    let graph = this.props.graph;
    return (
      <div>
        <ButtonToolbar>
            <ButtonGroup>
              <Button bsSize="xsmall" onClick={function(){setNodesWithIndex(1);}}>
                Back Fast
              </Button>
              <Button bsSize="xsmall" onClick={function(){setNodesWithIndex(graph.index - 1);}}>
                 Back
               </Button>
              <Button bsSize="xsmall">
              Play
               </Button>
               <Button bsSize="xsmall" onClick={function(){setNodesWithIndex(graph.index + 1);}}>
              Forward
               </Button>
              <Button bsSize="xsmall" onClick={function(){setNodesWithIndex(graph.graphs.length - 1);}}>
              Forward Fast
               </Button>
             </ButtonGroup>
           </ButtonToolbar>
      </div>
    );
  }
}

export default ButtonControl;
