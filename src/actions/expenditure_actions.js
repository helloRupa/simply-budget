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
import { chainPromise } from './error_actions';

export const addExpenditures = expenditures => ({
  type: 'ADD_EXPENDITURES',
  expenditures
});

export function fetchExpenditures() {
  const errorObj = { 
    error: 'Could not fetch all expenditures.',
    location: 'fetchExpenditures()'
  };

  return dispatch => {
    chainPromise(
      dispatch,
      getExpenditures,
      [exps => dispatch(addExpenditures(formatExpenditures(exps)))],
      errorObj
    );
  };
};

export const removeExpenditure = expenditure => ({
  type: 'REMOVE_EXPENDITURE',
  expenditure
});

export function destroyExpenditure(expenditure) {
  const errorObj = {
    error: 'Could not delete expenditure.',
    location: 'destroyExpenditure()'
  };

  return dispatch => {
    chainPromise(
      dispatch,
      () => deleteExpenditure(expenditure.id),
      [() => dispatch(removeExpenditure(expenditure))],
      errorObj
    );
  };
};

export const editExpenditure = expenditure => ({
  type: 'UPDATE_EXPENDITURE',
  expenditure
});

export function patchExpenditure(id, updated) {
  const errorObj = {
    error: 'Could not edit all expenditure.',
    location: 'patchExpenditure()'
  };

  return dispatch => {
    chainPromise(
      dispatch,
      () => updateExpenditure(id, updated),
      [exp =>dispatch(editExpenditure(exp))],
      errorObj
    );
  };
};

export const addExpenditure = expenditure => ({
  type: 'ADD_EXPENDITURE',
  expenditure
});

export function postExpenditure(expenditure, budget) {
  const errorObj = {
    error: 'Could not create expenditure.',
    location: 'postExpenditure()'
  };

  return dispatch => {
    return chainPromise(
      dispatch,
      () => createExpenditure(expenditure, budget),
      [exp => dispatch(addExpenditure(exp))],
      errorObj
    );
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
