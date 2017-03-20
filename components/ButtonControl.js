import React, {Component} from 'react';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ButtonToolbar, ButtonGroup, Glyphicon, span } from 'react-bootstrap';
import Slider from 'rc-slider';

const ButtonControl = ({size, value, isPlaying, play, setIndex, goToFirstIndex, goToPreviousIndex, goToNextIndex,
  goToLastIndex, canGoForward, canGoBack}) => {
  return (
      <div>
        <ButtonToolbar>
            <ButtonGroup>
              <Button bsSize="xsmall" onClick={goToFirstIndex} disabled={!canGoBack}>
                Fast Backwards
              </Button>
              <Button bsSize="xsmall" onClick={goToPreviousIndex} disabled={!canGoBack}>
              Previous step
               </Button>
              <Button bsSize="xsmall" onClick={play} disabled={!canGoForward}>
               {!isPlaying ? 'Play' : 'Stop'}
               </Button>
               <Button bsSize="xsmall" onClick={goToNextIndex} disabled={!canGoForward}>
              Next step
               </Button>
              <Button bsSize="xsmall" onClick={goToLastIndex} disabled={!canGoForward}>
              Fast forward
               </Button>
             </ButtonGroup>
           </ButtonToolbar>
           <Slider dots step={1} min={0} max={size} value={value} onChange={setIndex}/>
      </div>
    );
  }

export default ButtonControl;
