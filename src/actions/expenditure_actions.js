import { formatExpenditures } from '../utils/format';
import { getExpenditures, deleteExpenditure } from '../utils/comms';

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
    .then(exp => {
      dispatch(removeExpenditure(expenditure));
    });
  };
};
