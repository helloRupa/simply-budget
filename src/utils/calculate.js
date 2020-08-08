export function calculateTracking({
  expenditures, 
  budget: { id, limit, currentPeriod, truncated }
}) {
  const spent = (expenditures[id]) ? 
    expenditures[id].reduce((sum, exp) => sum + exp.amount, 0) : 0;

  return limit * currentPeriod - truncated - spent;
};

export function calculateTotalTracking(budgets, expenditures) {
  return budgets.reduce((sum, budget) => 
    sum + calculateTracking({ expenditures, budget }), 
    0);
};
