import React, { useState } from 'react';

function ClickOrHold(props) {
  const [timeDown, setTimeDown] = useState(0);
  const [pressState, setPressState] = useState('');

  const startTime = () => setTimeDown(Date.now());
  const setClickType = () => {
    Date.now() - timeDown < 500 ? setPressState('click') : setPressState('hold');
  };

  const handleClick = e => {
    if (pressState === 'hold') {
      props.holdCallback(e);
    }

    if (pressState === 'click') {
      props.clickCallback(e);
    }
  };

  return <span onMouseDown={startTime} onMouseUp={setClickType} onClick={handleClick}>
    {props.children}
  </span>
}

export default ClickOrHold;
