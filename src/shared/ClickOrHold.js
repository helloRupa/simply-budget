import React, { useState } from 'react';

function ClickOrHold({ holdCallback, clickCallback, children }) {
  const [timeDown, setTimeDown] = useState(0);
  const [pressState, setPressState] = useState('');

  const startTime = () => setTimeDown(Date.now());
  const setClickType = () => {
    Date.now() - timeDown < 500 ? setPressState('click') : setPressState('hold');
  };

  const handleClick = e => {
    if (pressState === 'hold' && typeof holdCallback === 'function') {
      holdCallback(e);
    }

    if (pressState === 'click' && typeof clickCallback === 'function') {
      clickCallback(e);
    }

    setPressState('');
  };

  return <span onMouseDown={startTime} onMouseUp={setClickType} onClick={handleClick}>
    {children}
  </span>
}

export default ClickOrHold;
