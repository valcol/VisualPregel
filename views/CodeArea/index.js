import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';


class CodeArea extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="code-container">
        <div className='code-area-header'>
          {this.props.title}
        </div>
        <CodeMirror value={this.props.code} onChange={this.props.handleCodeChange} options={{lineNumbers: true, mode: 'javascript'}} />
      </div>
    );
  }
}

export default CodeArea;
