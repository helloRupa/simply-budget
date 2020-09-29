import React, { useEffect } from 'react';
import { disableScroll, enableScroll } from '../utils/uiBehavior';

function Modal({ children, className='' }) {
  useEffect(() => {
    disableScroll();

    return enableScroll;
  }, []);

  return <div className="modal-background">
    <div className={`modal ${className}`}>
      { children }
    </div>
  </div>
}

export default Modal;
