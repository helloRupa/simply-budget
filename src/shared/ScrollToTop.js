import React from 'react';
import { scrollToTop } from '../utils/uiBehavior';

function ScrollToTop() {

  return <button onClick={scrollToTop} className="scroll-to-top">
    ^^^
  </button>
}

export default ScrollToTop;