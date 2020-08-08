const budgetState = {
  budgets: [],
  selected: null
};

function budgetReducer(state = budgetState, action) {
  switch(action.type) {
    case 'ADD_BUDGET':
      return {
        ...state,
        budgets: [...state.budgets, action.budget]
      };
    case 'CHANGE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.map(budget => 
          (budget.id === action.budget.id) ? action.budget : budget
        )
      };
    case 'REMOVE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.filter(budget => budget.id !== action.id)
      };
    case 'ADD_BUDGETS':
      return {
        ...state,
        budgets: action.budgets
      };
    case 'SELECT_BUDGET':
      return {
        ...state,
        selected: action.budget
      };
    default: 
      return state;
  }
}

export default budgetReducer;
