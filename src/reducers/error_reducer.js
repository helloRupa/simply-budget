const errorState = {
  error: null
};

function errorReducer(state = errorState, action) {
  switch(action.type) {
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}

export default errorReducer;