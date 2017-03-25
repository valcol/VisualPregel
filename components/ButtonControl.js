import React, {Component} from 'react';
import { FormGroup, InputGroup, FormControl, DropdownButton, MenuItem } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ButtonToolbar, ButtonGroup, Glyphicon, span } from 'react-bootstrap';
import Slider from 'rc-slider';
import FontAwesome from 'react-fontawesome';

const ButtonControl = ({size, value, isPlaying, play, setIndex, goToFirstIndex, goToPreviousIndex, goToNextIndex,
  goToLastIndex, canGoForward, canGoBack, setSpeed, speed}) => {
  return (
      <div className='controls'>
          <div className='controls_buttons_left' >
            <ButtonToolbar>
            <ButtonGroup>
              <Button bsSize="xsmall" onClick={goToFirstIndex} disabled={!canGoBack}>
              <FontAwesome name='fast-backward' />
              </Button>
              <Button bsSize="xsmall" onClick={goToPreviousIndex} disabled={!canGoBack}>
                <FontAwesome name='step-backward' />
               </Button>
              <Button bsSize="xsmall" onClick={play} disabled={!canGoForward}>
               {!isPlaying ? <FontAwesome name='play' /> : <FontAwesome name='pause' />}
               </Button>
               <Button bsSize="xsmall" onClick={goToNextIndex} disabled={!canGoForward}>
                <FontAwesome name='step-forward' />
               </Button>
              <Button bsSize="xsmall" onClick={goToLastIndex} disabled={!canGoForward}>
                <FontAwesome name='fast-forward' />
               </Button>
             </ButtonGroup>
           </ButtonToolbar>
          </div>
          <div className='controls_slider'>
           <Slider dots step={1} min={0} max={size} value={value} onChange={setIndex}/>
          </div>
          <div className='controls_buttons_right' >
               <DropdownButton dropup={true} bsSize="xsmall" title={'x'+speed} id="bg-nested-dropdown">
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
          </div>
      </div>
    );
  }

export default ButtonControl;
