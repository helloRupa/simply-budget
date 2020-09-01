const changeView = view => ({
  type: 'CHANGE_VIEW',
  view
});

export const chooseDashboard = () => changeView('DASHBOARD');

export const chooseBudget = () => changeView('BUDGET');

export const chooseSettings = () => changeView('SETTINGS');

export const chooseArchive = () => changeView('ARCHIVE');

export const chooseCreateBudget = () => changeView('CREATE_BUDGET');

export const chooseEditBudget = () => changeView('EDIT_BUDGET');

export const chooseEditExpenditure = () => changeView('EDIT_EXPENDITURE');
