import React from 'react';

function Close({ callback, display }) {
  return <button onClick={callback}>{display}</button>
}

export default Close;