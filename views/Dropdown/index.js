import React, {Component} from 'react';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';

class Dropdown extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FormGroup controlId="formControlsSelect">
        <InputGroup>
        <InputGroup.Addon>Select separator :</InputGroup.Addon>
        <FormControl componentClass="select" placeholder="select" value={this.props.separator}
          onChange={(e) => {this.props.setSeparator(e.target.value)}}>
          <option value=",">,</option>
          <option value=";">;</option>
          <option value="\t">\t</option>
        </FormControl>
      </InputGroup>
      </FormGroup>
    );
  }
}

export default Dropdown;
