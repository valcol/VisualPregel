import React, {Component} from 'react';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';

const Dropdown = ({ setSeparator, separator }) => {
  return (
    <FormGroup controlId="formControlsSelect">
      <InputGroup>
      <InputGroup.Addon>Select separator :</InputGroup.Addon>
      <FormControl componentClass="select" placeholder="select" value={separator}
        onChange={(e) => {setSeparator(e.target.value)}}>
        <option value=",">,</option>
        <option value=";">;</option>
        <option value="\t">\t</option>
      </FormControl>
    </InputGroup>
    </FormGroup>
  );
}

export default Dropdown;
