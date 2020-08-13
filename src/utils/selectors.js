export function selectExpenditures(expenditures, period) {
  return expenditures.filter(item => item.period === period);
};

export function selectDeletions(expenditures, budget) {
  const oldestPeriod = expenditures[0].period;

  return expenditures.reduce((res, exp) => {
    if (exp.period === oldestPeriod) {
      res.exps.push(exp);
      res.truncate += exp.amount;
    }

    return res;
  }, { exps: [], truncate: budget.truncated });
};
