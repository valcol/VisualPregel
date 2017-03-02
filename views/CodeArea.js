import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';


const CodeArea = ({ title, code, handleCodeReset, handleCodeChange}) => {
  return (
    <div className="code-container">
      <div className='code-area-header'>
        {title}
        <Button bsSize="xsmall" onClick={handleCodeReset} block>Reset</Button>
      </div>
      <CodeMirror value={code} onChange={handleCodeChange} options={{lineNumbers: true, mode: 'javascript'}} />
    </div>
  );
}

export default CodeArea;
