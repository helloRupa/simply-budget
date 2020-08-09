// id = budget id
const expenditureState = {
};

function expenditureReducer(state = expenditureState, action) {
  let budgetId;

  switch(action.type) {
    case 'ADD_EXPENDITURES':
      return {
        ...state,
        ...action.expenditures
      }
    case 'REMOVE_EXPENDITURE':
      budgetId = action.expenditure.budgetId;

      return {
         ...state,
         [budgetId]: state[budgetId].filter(exp => 
            exp.id !== action.expenditure.id)
      };
    case 'UPDATE_EXPENDITURE':
      budgetId = action.expenditure.budgetId;

      return {
        ...state,
        [budgetId]: state[budgetId].map(exp =>
          (exp.id !== action.expenditure.id) ? exp : action.expenditure
        )
      };
    default: 
      return state;
  }
}

export default expenditureReducer;