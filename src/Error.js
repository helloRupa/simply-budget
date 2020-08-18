import React from 'react';
import { connect } from 'react-redux';

function Error({ errors: { error } }) {

  return (
    <div>
      { error ? <div>
        <h2>Oops, something went wrong</h2>
        <p>{error}</p>
      </div> : null  }
    </div>
  )
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps)(Error);
