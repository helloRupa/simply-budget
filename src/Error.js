import React from 'react';
import { connect } from 'react-redux';
import { clearError } from './actions/error_actions';

function Error({ 
  errors: { error, location }, 
  clearError, 
  setForceUpdate, 
  forceUpdate 
}) {
  const reload = () => {
    clearError();
    setForceUpdate(forceUpdate + 1);
  };

  return (
    <div>
      { error ? <div>
        <h2>Oops, something went wrong</h2>
        <p>{error}</p>
        <p>Location: {location}</p>
        <button onClick={reload}>Reload</button>
      </div> : null  }
    </div>
  )
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { clearError })(Error);
