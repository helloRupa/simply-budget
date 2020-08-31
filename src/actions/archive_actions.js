export const addArchived = budgets => ({
  type: 'ADD_ARCHIVED',
  budgets
});

export const archiveBudget = budget => ({
  type: 'ARCHIVE_BUDGET',
  budget
});

export const deleteArchived = budget => ({
  type: 'DELETE_ARCHIVED',
  budget
});
