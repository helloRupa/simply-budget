import React from 'react';

function Tooltip({ msg }) {
  return <div className="tooltip">
    <div>
      { msg }
    </div>  
    <span className="triangle"></span>
  </div>
}

export default Tooltip;
