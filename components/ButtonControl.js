import React, {Component} from 'react';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ButtonToolbar, ButtonGroup, Glyphicon, span } from 'react-bootstrap';

const ButtonControl = ({isPlaying, play, goToFirstIndex, goToPreviousIndex, goToNextIndex, goToLastIndex}) => {
  return (
      <div>
        <ButtonToolbar>
            <ButtonGroup>
              <Button bsSize="xsmall" onClick={goToFirstIndex}>
                Fast Backwards
              </Button>
              <Button bsSize="xsmall" onClick={goToPreviousIndex}>
              Previous step
               </Button>
              <Button bsSize="xsmall" onClick={play}>
               {!isPlaying ? 'Play' : 'Stop'}
               </Button>
               <Button bsSize="xsmall" onClick={goToNextIndex}>
              Next step
               </Button>
              <Button bsSize="xsmall" onClick={goToLastIndex}>
              Fast forward
               </Button>
             </ButtonGroup>
           </ButtonToolbar>
      </div>
    );
  }

export default ButtonControl;
