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
          <FontAwesome name='refresh' title='Reset code' onClick={resetCode}/>
          <FontAwesome name='question-circle' title='Help' onClick={this.open}/>
        </div>
        <Modal show={this.state.showModal} onHide={this.close}>
         <Modal.Header closeButton>
           <Modal.Title>GraphX Pregel </Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <h4><strong>INITIALIZE</strong> function : </h4>
           <p>This function initialize the vertex properties. It takes as a parameter the id of the vertex as well as its current properties. </p>

           <hr />
           <h4><strong>DISPATCH</strong> function : </h4>
           <p>This function send a message to neighboring vertices. It is invoked on the edges of the vertices that received messages in Pregel's supersteps. </p>

           <hr />

           <h4><strong>AGGREGATE</strong> function : </h4>
           <p>This function reduces input values from Pregel's supersteps. It takes as argument a pair of messages combines them and returns a signle message of the same type as the incoming messages  </p>

           <hr />

           <p>For more informations about GraphX Pregel <a href="http://spark.apache.org/docs/latest/graphx-programming-guide.html#pregel-api">click here!</a></p>

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
