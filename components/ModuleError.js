import React, {Component} from 'react';
import {ToastMessage,ToastContainer} from 'react-toastr';

const Alert = React.createFactory(ToastMessage.animation);


class ModuleError extends Component {

  constructor(props) {
    super(props);
  }

  addAlert(error) {
    this.refs.container.warning(error);
  }


  componentWillReceiveProps(nextProps) {
    this.addAlert(nextProps.error);
  }

  render() {
    return (
      <div>
        <ToastContainer
          toastMessageFactory={Alert}
          ref="container"
          className="toast-top-right"
        />
        </div>

    );
  }
}

export default ModuleError;
