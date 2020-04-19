import { formatNumber } from './format';

const url = 'http://localhost:8000/budgets';

const generalFetch = (url, options) => {
  return fetch(url, options)
    .then(res => res.json())
    .catch(console.log)
};

export function getBudgets() {
  return generalFetch(url);
}

export function createBudget(settingsObj) {
  const date = new Date();
  const budgetObj =  {
    name: settingsObj.name,
    currency: settingsObj.currency,
    frequency: settingsObj.frequency,
    limit: formatNumber(settingsObj.limit),
    startDate: `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`,
    tracking: `-${formatNumber(settingsObj.limit)}`,
    currentPeriod: 1,
    expenditures: [
    ]
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(budgetObj)
  };

  return generalFetch(url, options);
};

export function updateBudget(id, budget) {
  const patchUrl = `${url}/${id}`;
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(budget)
  }

  return generalFetch(patchUrl, options);
} 
