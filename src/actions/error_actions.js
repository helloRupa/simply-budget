export const setError = (error, location) => ({
  type: 'SET_ERROR',
  error, location
});

export const clearError = () => ({ 
  type: 'CLEAR_ERROR' 
});
