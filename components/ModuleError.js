import React, {Component} from 'react';
import ToastMessage from 'node_modules.react-toastr';

const Alert = React.createFactory(ToastMessage.animation);

const Message = ({ msg }) => {
  return msg;
};

export default class ModuleError extends Component {

  addAlert() {
    this.refs.container.danger(Message, {
      closeButton: true
    });
  }


  render() {
    return (
      <div>
        <ToastContainer
          toastMessageFactory={Alert}
          ref="container"
          className="toast-top-right"
        />

        <div className="btn-container">
          <button className="primary" onClick={this.addAlert}>
              Alert
          </button>

         </div>
        </div>

    );
  }
}
