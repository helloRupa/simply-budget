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

function objectMapper(itemsArray, selector) {
  return itemsArray.reduce((accum, el) => { 
    if (!accum[el[selector]]) {
      accum[el[selector]] = []; 
    }
    
    accum[el[selector]].push(el);

    return accum; 
  }, {});
};

export function budgetsByCurrency(budgets) {
  return objectMapper(budgets, 'currency');
};

export function formatExpenditures(expenditures) {
  return objectMapper(expenditures, 'budgetId');
};
