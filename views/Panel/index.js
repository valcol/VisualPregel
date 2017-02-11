import React, {Component} from 'react';
import UploadBox from '../UploadBox';
import { Button } from 'react-bootstrap';

class Panel extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
    <div>
      <UploadBox/>
      <Button bsSize="large" onClick={this.props.execute} block>Execute</Button>
    </div>
    );
  }
}

export default Panel;
