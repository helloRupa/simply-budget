// id = budget id
const expenditureState = {
};

function expenditureReducer(state = expenditureState, action) {
  switch(action.type) {
    case 'ADD_EXPENDITURES':
      return {
        ...state,
        ...action.expenditures
      }
    case 'REMOVE_EXPENDITURE':
      const budgetId = action.expenditure.budgetId;

      return {
         ...state,
         [budgetId]: state[budgetId].filter(exp => 
            exp.id !== action.expenditure.id)
      };
    default: 
      return state;
  }
}

export default expenditureReducer;