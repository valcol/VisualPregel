import React, {Component} from 'react';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';

const DropdownPreset = ({ setPreset, Preset }) => {
  return (
    <FormGroup controlId="formControlsSelect">
      <InputGroup>
      <InputGroup.Addon>Select Preset :</InputGroup.Addon>
      <FormControl componentClass="select" placeholder="select" value={Preset}
        onChange={(e) => {setPreset(e.target.value)}}>
          <option value="Defalut">Default Algo</option>
        <option value="ShortPath">Short Path</option>
        <option value="NeighboringSummits">Neighboring Summits</option>
      </FormControl>
    </InputGroup>
    </FormGroup>
  );
}

export default DropdownPreset;
