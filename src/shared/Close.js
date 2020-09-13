import React from 'react';

function Close({ callback, display, className="" }) {
  return <button onClick={callback} className={className}>
    {display}
  </button>
}

export default Close;