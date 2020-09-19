import React from 'react';

function Button({ callback, display, className="" }) {
  return <button onClick={callback} className={className}>
    {display}
  </button>
}

export default Button;