export function selectExpenditures(expenditures, period) {
  return expenditures.filter(item => item.period === period);
};
