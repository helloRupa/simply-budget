const settingsState = {
  'default-currency': '',
  'max-length': 250,
  'categories': []
};

function settingsReducer(state = settingsState, action) {
  switch(action.type) {
    case 'SET_SETTINGS':
      return {
        ...state,
        ...action.settings
      }
    default: 
      return state;
  }
}

export default settingsReducer;
