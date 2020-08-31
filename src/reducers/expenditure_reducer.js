// id = budget id
const expenditureState = {
};

function expenditureReducer(state = expenditureState, action) {
  let budgetId = action.expenditure ? action.expenditure.budgetId : null;

  switch(action.type) {
    case 'ADD_EXPENDITURES':
      return {
        ...state,
        ...action.expenditures
      };
    case 'ADD_EXPENDITURE':
      return {
        ...state,
        [budgetId]: [...state[budgetId] || [], action.expenditure]
      };
    case 'REMOVE_EXPENDITURE':
      return {
         ...state,
         [budgetId]: state[budgetId].filter(exp => 
            exp.id !== action.expenditure.id)
      };
    case 'UPDATE_EXPENDITURE':
      return {
        ...state,
        [budgetId]: state[budgetId].map(exp =>
          (exp.id !== action.expenditure.id) ? exp : action.expenditure
        )
      };
    case 'REMOVE_BUDGET_EXPENDITURES':
      let copy = {...state};
      delete copy[action.budgetId];

      return copy;
    default: 
      return state;
  }
}

export default expenditureReducer;