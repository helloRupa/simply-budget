import React from 'react';

// function Error({ msg }) {
//   return <div className="error">
//     {msg}
//   </div>
// }

function Error({ msg, condition }) {
  const displayError = () => (condition) ? msg : '';

  return <div className="error">
    { displayError() }
  </div>
}

export default Error;
