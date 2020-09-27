import React, { useState } from 'react';
import { connect } from 'react-redux';
import { clearTooltip } from '../actions/tooltip_actions';

function Tooltip({ tooltip, clearTooltip }) {
  const [moveTooltip, setMoveTooltip] = useState('');
return null;
  // if (tooltip) {
  //   setTimeout(() => {
  //     setMoveTooltip(() => '');
  //     clearTooltip();
  //   }, 3000);

  //   setTimeout(() => setMoveTooltip(() => 'move-tooltip'), 5);

  //   return (
  //     <div className={`tooltip ${moveTooltip}`}>
  //       <div>{ tooltip }</div>  
  //       <span className="triangle"></span>
  //     </div>
  //   );
  // } else {
  //   return null;
  // }
}

const mapStateToProps = state => ({
  tooltip: state.tooltip
});

export default connect(mapStateToProps, { clearTooltip })(Tooltip);
