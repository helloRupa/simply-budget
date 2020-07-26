const budgetState = {
  budgets: [],
  selected: null
};

function budgetReducer(state = budgetState, action) {
  switch(action.type) {
    case 'ADD_BUDGETS':
      return {
        ...state,
        budgets: action.budgets
      };
    case 'SELECT_BUDGET':
      return {
        ...state,
        selected: action.selected
      };
    default: 
      return state;
  }
}

export default budgetReducer;