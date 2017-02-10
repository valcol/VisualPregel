import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';


class CodeArea extends Component {

  constructor(props) {
    super(props);
    this.state = {
      code:props.baseCode
    }
  }

  updateCode(e){
    this.setState({
      code: e.target.value
    });
  }

  render() {
    return (
      <div className="code-container">
        <div className='code-area-header'>
          {this.props.title}
        </div>
        <CodeMirror value={this.state.code} onChange={this.updateCode} options={{lineNumbers: true, mode: 'javascript'}} />
      </div>
    );
  }
}

export default CodeArea;
