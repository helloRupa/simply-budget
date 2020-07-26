import { getBudgets, deleteBudget } from '../utils/comms';
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

export const removeBudget = id => ({
  type: 'REMOVE_BUDGET',
  id
});

export function destroyBudget(id) {
  return (dispatch) => {
    deleteBudget(id)
    .then(budget => {
      dispatch(removeBudget(id));
    });
  };
};
