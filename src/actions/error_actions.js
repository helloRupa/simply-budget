export const setError = ({ error, location, debug }) => ({
  type: 'SET_ERROR',
  debug: debug.message,
  error, location
});

export const clearError = () => ({ 
  type: 'CLEAR_ERROR' 
});
