import React, {Component} from 'react';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';

const DropdownPreset = ({setNeighboringSummits, setTriangleCounting, setDefault}) => {
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
          case 'ShortPath':
            console.log('SHORT PATH NOT IMPLEMENTED !');
            return;
          case 'TriangleCounting':
            setTriangleCounting();
            return;
          default:
            setDefault();
          }
        }}>
        <option value="Defalut">Default Algo</option>
        <option value="ShortPath">Short Path</option>
        <option value="NeighboringSummits">Neighboring Summits</option>
        <option value="TriangleCounting">Triangle Counting</option>
      </FormControl>
    </InputGroup>
    </FormGroup>
  );
}

export default DropdownPreset;
