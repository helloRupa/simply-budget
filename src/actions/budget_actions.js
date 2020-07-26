import { getBudgets } from '../utils/comms';
// import { formatBudgets } from '../utils/format';

export const addBudgets = budgets => ({
  type: 'ADD_BUDGETS',
  budgets
});

export function fetchBudgets() {
  return (dispatch) => {
    getBudgets()
    .then(budgets => {
      dispatch(addBudgets(budgets));
    });
  };
};

export const selectBudget = budget => ({
  type: 'SELECT_BUDGET',
  budget
});
