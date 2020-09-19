import React, { useState } from 'react';

function ClickOrHold({ holdCallback, clickCallback, children }) {
  const [timer, setTimer] = useState('');

  const startHold = e => {
    setTimer(setTimeout(() => {
      if (typeof holdCallback === 'function') {
        holdCallback(e);
      }
    }, 500));
  };

  const handleClick = e => {
    if (typeof clickCallback === 'function') {
      clearTimeout(timer);
      clickCallback(e);
    }
  };

  return <span onMouseDown={startHold} onClick={handleClick}>
    {children}
  </span>
}

export default ClickOrHold;
