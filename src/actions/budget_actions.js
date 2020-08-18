import { 
  getBudgets, 
  deleteBudget, 
  updateBudget, 
  createBudget,
  updateBudgetCurrentPeriod
} from '../utils/comms';
import { setError } from './error_actions';

export const addBudgets = budgets => ({
  type: 'ADD_BUDGETS',
  budgets
});

export function fetchBudgets() {
  return dispatch => {
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
  return dispatch => {
    deleteBudget(id)
    .then(_ => {
      dispatch(removeBudget(id));
    });
  };
};

export const changeBudget = budget => ({
  type: 'CHANGE_BUDGET',
  budget
});

export function patchBudget(id, budget) {
  return dispatch => {
    updateBudget(id, budget)
    .then(budget => {
      dispatch(changeBudget(budget));
    });
  };
};

export const addBudget = budget => ({
  type: 'ADD_BUDGET',
  budget
});

export function newBudget(budget) {
  return dispatch => {
    createBudget(budget)
    .then(budget => {
      dispatch(addBudget(budget));
    });
  };
};

export function updateBudgetsCurrentPeriods() {
  return dispatch => {
    getBudgets()
    .then(budgets => {
      Promise.all(budgets.map(budget => 
        updateBudgetCurrentPeriod(budget))
      ).then(_ => {
        getBudgets()
        .then(budgets => {
          dispatch(addBudgets(budgets));
        });
      });
    }).catch(error => dispatch(setError(error.message)));
  };
};
