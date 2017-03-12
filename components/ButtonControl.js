import React, {Component} from 'react';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ButtonToolbar, ButtonGroup, Glyphicon, span } from 'react-bootstrap';

const ButtonControl = ({ BackFast, Back, Play, ForwardFast, Forward }) => {

  return (
    <div className='panel'>
       <ButtonToolbar>
           <ButtonGroup>
             <Button bsSize="lg" eventKey='1' onClick={BackFast}>
                <span class="glyphicon glyphicon-backward"></span>Back Fast
             </Button>
             <Button bsSize="lg" eventKey='2' onClick={Back}>
               <span class="glyphicon glyphicon-triangle-left" aria-label="Left Align"></span> Back
             </Button>
             <Button bsSize="lg" eventKey='3' onClick={Play}>
               <span class="glyphicon glyphicon-play"></span> Play
             </Button>
             <Button bsSize="lg" eventKey='4' onClick={Forward}>
               <span class="glyphicon glyphicon-triangle-right"></span> Forward
             </Button>
             <Button bsSize="lg" eventKey='5' onClick={ForwardFast}>
               <span class="glyphicon glyphicon-forward"> </span>  value="Forward Fast"
             </Button>

           </ButtonGroup>
      </ButtonToolbar>
   </div>
  );
};

export default ButtonControl;
