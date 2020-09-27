import { SET_TOOLTIP, CLEAR_TOOLTIP } from '../constants/redux';

const tooltipState = [];

function tooltipReducer(state = tooltipState, action) {
  switch(action.type) {
    case SET_TOOLTIP:
      return [...state, action.tooltip];
    case CLEAR_TOOLTIP:
      return state.filter(tt => tt !== action.tooltip);
    default:
      return state;
  }
}

export default tooltipReducer;
