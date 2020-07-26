const budgetState = {
  budgets: [],
  selected: null
};

function budgetReducer(state = budgetState, action) {
  switch(action.type) {
    case 'REMOVE_BUDGET':
      console.log(action);
      console.log(state.budgets);
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