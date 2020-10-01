import React, { useEffect, useState } from 'react';
import { disableScroll, enableScroll } from '../utils/uiBehavior';

function Loading({ condition=false }) {
  const [show, setShow] = useState(condition);
  const [fade, setFade] = useState('');

  disableScroll();

  useEffect(() => {
    if (!condition) {
      setFade('fade-out');

      setTimeout(() => {
        setShow(false);
        enableScroll();
      }, 200);
    }
  }, [condition]);

  if (show) {
    return <div className={`loading ${fade}`}>
    </div>
  }

  return null;
}

export default Loading;
