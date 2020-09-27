import { SET_TOOLTIP, CLEAR_TOOLTIP } from '../constants/redux';

const tooltipState = null;

function tooltipReducer(state = tooltipState, action) {
  switch(action.type) {
    case SET_TOOLTIP:
      return action.tooltip;
    case CLEAR_TOOLTIP:
      return null;
    default:
      return state;
  }
}

export default tooltipReducer;
