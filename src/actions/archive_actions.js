import { getArchives, postArchive, deleteArchived } from '../utils/comms';
import { chainPromise } from './error_actions';
import { destroyBudget } from './budget_actions';

export const addArchived = budgets => ({
  type: 'ADD_ARCHIVED',
  budgets
});

export function fetchArchives() {
  return dispatch => {
    return chainPromise(
      dispatch,
      getArchives,
      [budgets => dispatch(addArchived(budgets))],
      { error: 'Could not fetch archives', location: 'fetchArchives()' }
    );
  };
};

export const addToArchive = budget => ({
  type: 'ARCHIVE_BUDGET',
  budget
});

// Still need to delete the budget, which will automatically delete its expenditures
export function archiveBudget(budget, expenditures) {
  return dispatch => {
    return chainPromise(
      dispatch,
      () => postArchive(budget, expenditures),
      [
        archived => dispatch(addToArchive(archived)), 
        () => destroyBudget(budget.id)(dispatch)
      ],
      { error: 'Could not archive budget', location: 'archiveBudget()' }
    );
  };
};

export const removeArchived = budget => ({
  type: 'DELETE_ARCHIVED',
  budget
});

export function destroyArchived(budget) {
  return dispatch => {
    return chainPromise(
      dispatch,
      () => deleteArchived(budget.id),
      [() => dispatch(removeArchived(budget))],
      { error: 'Budget might not have deleted', location: 'destroyArchived()' }
    );
  };
};
