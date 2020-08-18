export const setError = ({ error, location, debug }) => ({
  type: 'SET_ERROR',
  error, location, debug
});

export const clearError = () => ({ 
  type: 'CLEAR_ERROR' 
});
