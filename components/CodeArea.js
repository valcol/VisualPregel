import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button,Modal } from 'react-bootstrap';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import FontAwesome from 'react-fontawesome';


const CodeArea = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },
  render(){
    const { title, code, resetCode, setCode } = this.props;
  return (
    <div className="code-container">
      <div className='code-area-header'>
        {title}
        <div className='toolbox'>
          <FontAwesome name='refresh' onClick={resetCode}/>
          <FontAwesome name='question-circle' onClick={this.open}/>
        </div>
        <Modal show={this.state.showModal} onHide={this.close}>
         <Modal.Header closeButton>
           <Modal.Title>Documentation</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <h4>Function : </h4>
           <p>TO DO.</p>
         </Modal.Body>
         <Modal.Footer>
           <Button onClick={this.close}>Close</Button>
         </Modal.Footer>
       </Modal>
      </div>
      <CodeMirror value={code} onChange={setCode} options={{lineNumbers: true, mode: 'javascript'}} />
    </div>
  );
}
});

export default CodeArea;
