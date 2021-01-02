export const totalSpent = (budgetsExpenses, budgetId) =>
  budgetsExpenses.expenses[budgetId].reduce(
    (total, exp) => total + exp.amount,
    0
  );

export const budgetTracking = (budgetsExpenses, budgetId) => {
  const { budgets } = budgetsExpenses;
  const budget = budgets.find((b) => b.id === budgetId);

  return (
    budget.currentPeriod * budget.limit -
    totalSpent(budgetsExpenses, budget.id) -
    budget.truncated
  );
};
