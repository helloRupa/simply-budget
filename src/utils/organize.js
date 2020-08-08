export function budgetsByCurrency(budgets) {
  return budgets.reduce((obj, budget) => {
    if (!obj[budget.currency]) {
      obj[budget.currency] = [];
    }

    obj[budget.currency].push(budget);
    
    return obj;
  }, {});
};

