export const setError = ({ error, location, debug }) => ({
  type: 'SET_ERROR',
  debug: debug.message,
  error, location
});

export const dispatchError = (dispatch, error) => {
  dispatch(setError(error));
};

export const clearError = () => ({ 
  type: 'CLEAR_ERROR' 
});
