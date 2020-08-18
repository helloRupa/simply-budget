const errorState = {
  error: null,
  location: null,
  debug: null
};

function errorReducer(state = errorState, action) {
  switch(action.type) {
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
        location: action.location,
        debug: action.debug
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
        location: null,
        debug: null
      };
    default:
      return state;
  }
}

export default errorReducer;