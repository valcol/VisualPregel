import React, {Component} from 'react';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';

const DropdownPreset = ({setNeighboringSummits, setDirectedTriangleCounting, setDefault}) => {
  return (
    <FormGroup controlId="formControlsSelect">
      <InputGroup>
      <InputGroup.Addon>Select Preset :</InputGroup.Addon>
      <FormControl componentClass="select" placeholder="select"
        onChange={(e) => {
          switch (e.target.value) {
          case 'NeighboringSummits':
            setNeighboringSummits();
            return;
          case 'DirectedTriangleCounting':
            setDirectedTriangleCounting();
            return;
          default:
            setDefault();
          }
        }}>
        <option value="Minimum">Minimum</option>
        <option value="NeighboringSummits">Neighboring Summits</option>
        <option value="DirectedTriangleCounting">Directed Triangle Counting</option>
      </FormControl>
    </InputGroup>
    </FormGroup>
  );
}

export default DropdownPreset;
