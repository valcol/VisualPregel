import ModuleErrorComponent from '../components/ModuleError';
import { Provider, connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    error: state.error
  };
}

const ModuleError = connect(
  mapStateToProps
)(ModuleErrorComponent);

export default ModuleError;
