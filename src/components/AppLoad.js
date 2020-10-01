import React, { useState, useEffect } from 'react';
import { disableScroll, enableScroll } from '../utils/uiBehavior';

function AppLoad({ firstMount }) {
  const [show, setShow] = useState(firstMount);
  const [fade, setFade] = useState('');

  disableScroll();

  useEffect(() => {
    if (!firstMount) {
      setTimeout(() => {
        setFade('fade-out');
        setShow(false);
        enableScroll();
      }, 2000);
    }
  }, [firstMount]);

  if (!show) {
    return null;
  }

  return <div className={`loading ${fade} app`}>
    <h1>Simply Budget</h1>
  </div>
}

export default AppLoad;