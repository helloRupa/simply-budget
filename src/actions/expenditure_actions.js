import { formatExpenditures } from '../utils/format';
import { 
  getExpenditures, 
  deleteExpenditure, 
  updateExpenditure,
  createExpenditure
} from '../utils/comms';
import { updateBudget } from '../utils/comms';
import { changeBudget, selectBudget } from './budget_actions';
import { selectDeletions} from '../utils/selectors';

export const addExpenditures = expenditures => ({
  type: 'ADD_EXPENDITURES',
  expenditures
});

export function fetchExpenditures() {
  return dispatch => {
    getExpenditures()
    .then(exps => {
      dispatch(addExpenditures(formatExpenditures(exps)));
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
    });
  };
};

export function truncateExpenditures(expenditures, budget) {
  const budgetId = budget.id;
  const deletions = selectDeletions(expenditures, budget);

  return dispatch => {
    Promise.all(deletions.exps.map(exp => {
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
