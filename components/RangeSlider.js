import React, {Component} from 'react';
import Slider from 'rc-slider';


const RangeSlider = ({size, value, setIndex}) => {
  return (
    <div>
      <Slider dots step={1} min={0} max={size} value={value} onChange={setIndex}/>
    </div>
  );
}

export default RangeSlider;
