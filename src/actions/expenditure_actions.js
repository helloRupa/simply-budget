import { formatExpenditures } from '../utils/format';
import { getExpenditures } from '../utils/comms';

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
