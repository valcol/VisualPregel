import React, {Component} from 'react';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';

const ValueDropDown = ({ setValue, value }) => {
  return (
      <FormGroup controlId="formControlsSelect">
        <InputGroup>
       <InputGroup.Addon>Select Value :</InputGroup.Addon>
        <FormControl componentClass="select" placeholder="select" value={value}
          onChange={(e) => {setValue(e.target.value)}}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </FormControl>
      </InputGroup>
      </FormGroup>

);
}

export default ValueDropDown;
