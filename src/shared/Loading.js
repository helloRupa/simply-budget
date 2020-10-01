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
      }, 300);
    }
  }, [condition]);

  if (show) {
    return <div className={`loading ${fade}`}>
      {/* <h1>Simply Budget</h1>
      <div className="message">
        <p>Gotta save that cish cash</p>
        <p>for the splish splash!</p>
      </div> */}
    </div>
  }

  return null;
}

export default Loading;
