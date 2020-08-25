export function formatNumber(value) {
  return parseFloat(value).toFixed(2);
};

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

export function sortByDateDesc(exps) {
  return [...exps].sort((a, b) => new Date(b.date) - new Date(a.date));
};
