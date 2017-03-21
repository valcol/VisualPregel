import React, {Component} from 'react';
import { FormGroup, InputGroup, FormControl, DropdownButton, MenuItem } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ButtonToolbar, ButtonGroup, Glyphicon, span } from 'react-bootstrap';
import Slider from 'rc-slider';

const ButtonControl = ({size, value, isPlaying, play, setIndex, goToFirstIndex, goToPreviousIndex, goToNextIndex,
  goToLastIndex, canGoForward, canGoBack, setSpeed, speed}) => {
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
               <DropdownButton bsSize="xsmall" title={'x'+speed} id="bg-nested-dropdown">
                 <MenuItem eventKey="0.25" onClick={()=>{setSpeed(0.25)}}>
                   x0.25
                 </MenuItem>
                <MenuItem eventKey="0.5" onClick={()=>{setSpeed(0.5)}}>
                  x0.5
                </MenuItem>
                <MenuItem eventKey="0.5" onClick={()=>{setSpeed(1)}}>
                  x1
                </MenuItem>
                <MenuItem eventKey="0.5" onClick={()=>{setSpeed(2)}}>
                  x2
                </MenuItem>
                <MenuItem eventKey="0.5" onClick={()=>{setSpeed(4)}}>
                  x4
                </MenuItem>
                <MenuItem eventKey="0.5" onClick={()=>{setSpeed(8)}}>
                  x8
                </MenuItem>
                <MenuItem eventKey="0.5" onClick={()=>{setSpeed(16)}}>
                  x16
                </MenuItem>
              </DropdownButton>
             </ButtonGroup>
           </ButtonToolbar>
           <Slider dots step={1} min={0} max={size} value={value} onChange={setIndex}/>
      </div>
    );
  }

export default ButtonControl;
