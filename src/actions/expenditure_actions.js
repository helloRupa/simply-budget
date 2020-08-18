import { formatExpenditures } from '../utils/format';
import { 
  getExpenditures, 
  deleteExpenditure, 
  updateExpenditure,
  createExpenditure,
  updateBudget
} from '../utils/comms';
import { changeBudget, selectBudget } from './budget_actions';
import { selectDeletions} from '../utils/selectors';
import { dispatchError } from './error_actions';

export const addExpenditures = expenditures => ({
  type: 'ADD_EXPENDITURES',
  expenditures
});

export function fetchExpenditures() {
  return dispatch => {
    getExpenditures()
    .then(exps => {
      dispatch(addExpenditures(formatExpenditures(exps)));
    }).catch(error => {
      dispatchError(dispatch, { 
        error: 'Could not fetch all expenditures.',
        location: 'fetchExpenditures()',
        debug: error
      });
    });
  };
};

export const removeExpenditure = expenditure => ({
  type: 'REMOVE_EXPENDITURE',
  expenditure
});

export function destroyExpenditure(expenditure) {
  return dispatch => {
    deleteExpenditure(expenditure.id)
    .then(_ => {
      dispatch(removeExpenditure(expenditure));
    }).catch(error => {
      dispatchError(dispatch, { 
        error: 'Could not delete expenditure.',
        location: 'destroyExpenditure()',
        debug: error
      });
    });
  };
};

export const editExpenditure = expenditure => ({
  type: 'UPDATE_EXPENDITURE',
  expenditure
});

export function patchExpenditure(id, updated) {
  return dispatch => {
    updateExpenditure(id, updated)
    .then(exp => {
      dispatch(editExpenditure(exp));
    }).catch(error => {
      dispatchError(dispatch, { 
        error: 'Could not edit all expenditure.',
        location: 'patchExpenditure()',
        debug: error
      });
    });
  };
};

export const addExpenditure = expenditure => ({
  type: 'ADD_EXPENDITURE',
  expenditure
});

export function postExpenditure(expenditure, budget) {
  return dispatch => {
    return createExpenditure(expenditure, budget)
    .then(exp => {
      dispatch(addExpenditure(exp));
    }).catch(error => {
      dispatchError(dispatch, { 
        error: 'Could not create expenditure.',
        location: 'postExpenditure()',
        debug: error
      });
    });
  };
};

export function truncateExpenditures(expenditures, budget) {
  const budgetId = budget.id;
  const deletions = selectDeletions(expenditures, budget);

  return dispatch => {
    return Promise.all(deletions.exps.map(exp => {
      return deleteExpenditure(exp.id)
      .then(_ => dispatch(removeExpenditure(exp)));
    })).then(_ => {
      updateBudget(budgetId, { truncated: deletions.truncate })
      .then(budget => {
        dispatch(changeBudget(budget));
        dispatch(selectBudget(budget));
      });
    });
  };
};
