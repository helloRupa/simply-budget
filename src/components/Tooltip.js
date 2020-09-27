import React from 'react';
import { connect } from 'react-redux';
import { clearTooltip } from '../actions/tooltip_actions';

function Tooltip({ tooltip, clearTooltip }) {
  if (tooltip) {
    setTimeout(() => clearTooltip(), 3000);

    return (
      <div className="tooltip">
        <div>{ tooltip }</div>  
        <span className="triangle"></span>
      </div>
    );
  } else {
    return null;
  }
}

const mapStateToProps = state => ({
  tooltip: state.tooltip
});

export default connect(mapStateToProps, { clearTooltip })(Tooltip);
