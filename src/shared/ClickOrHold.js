import React, { useState } from 'react';

function ClickOrHold({ holdCallback, clickCallback, children }) {
  const [timer, setTimer] = useState('');
  const [wasHeld, setWasHeld] = useState(false);

  const startHold = e => {
    setWasHeld(false);

    setTimer(setTimeout(() => {
      if (typeof holdCallback === 'function') {
        holdCallback(e);
        setWasHeld(true);
      }
    }, 500));
  };

  const handleClick = e => {
    if (!wasHeld && typeof clickCallback === 'function') {
      clearTimeout(timer);
      clickCallback(e);
    }
  };

  return <span onMouseDown={startHold} onClick={handleClick} onTouchStart={startHold} onTouchEnd={handleClick}>
    {children}
  </span>
}

export default ClickOrHold;
