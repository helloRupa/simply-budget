export function formatNumber(value) {
  if (typeof value === 'number') {
    value = value.toString(10);
  }

  const dotIndex = value.indexOf('.');

  switch (dotIndex) {
    case -1:
      return `${value}.00`;
    case value.length - 1:
      return `${value}00`;
    case value.length - 2:
      return `${value}0`;
    default:
      return value;
  }
};

// export function formatBudgets(budgets) {
//   return budgets.reduce((accum, el) => { 
//     accum[el.id] = el; 
//     return accum; 
//   }, {});
// };

export function formatExpenditures(expenditures) {
  return expenditures.reduce((accum, el) => { 
    if (!accum[el.budgetId]) {
      accum[el.budgetId] = []; 
    }
    
    accum[el.budgetId].push(el);

    return accum; 
  }, {});
};
