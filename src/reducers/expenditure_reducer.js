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
    default: 
      return state;
  }
}

export default expenditureReducer;