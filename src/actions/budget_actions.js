import { 
  getBudgets, 
  deleteBudget, 
  updateBudget, 
  createBudget,
  updateBudgetCurrentPeriod
} from '../utils/comms';
import { dispatchError } from './error_actions';

export const addBudgets = budgets => ({
  type: 'ADD_BUDGETS',
  budgets
});

// currently unused
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
    }).catch(error => {
      dispatchError(dispatch, { 
        error: 'Budget might not have deleted. You may need to try again.',
        location: 'destroyBudget()',
        debug: error
      });
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
    }).catch(error => {
      dispatchError(dispatch, { 
        error: 'Budget might not have updated. You may need to try again.',
        location: 'patchBudget()',
        debug: error
      });
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
    }).catch(error => {
      dispatchError(dispatch, { 
        error: 'Budget might not have been created. You may need to try again.',
        location: 'newBudget()',
        debug: error
      });
    });
  };
};

function getBudgetsWithCatch(callback, dispatch, location) {
  return getBudgets()
  .then(budgets => callback(budgets))
  .catch(error => {
    dispatchError(dispatch, { 
      error: 'Could not fetch all budgets.',
      debug: error,
      location
    });
  });
}

function updateAllBudgets(budgets, dispatch) {
  return Promise.all(budgets.map(budget => 
    updateBudgetCurrentPeriod(budget))
  ).then(_ => {
    getBudgetsWithCatch(budgets => dispatch(addBudgets(budgets)),
      dispatch, 'updateBudgetsCurrentPeriods() > getBudgets()');
  }).catch(error => {
    dispatchError(dispatch, { 
      error: 'Could not update all budget periods.',
      location: 'Promise.all([updateBudgetCurrentPeriod])',
      debug: error
    });
  });
}

export function updateBudgetsCurrentPeriods() {
  return dispatch => {
    getBudgetsWithCatch(budgets => updateAllBudgets(budgets, dispatch), 
      dispatch, 'getBudgets()');
  };
};
