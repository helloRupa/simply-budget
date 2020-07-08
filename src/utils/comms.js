import { formatNumber } from './format';

const baseUrl = 'http://localhost:8000';
const budgetsUrl = `${baseUrl}/budgets`;
const settingsUrl = `${baseUrl}/settings/1`;

const generalFetch = (url, options) => {
  return fetch(url, options)
    .then(res => res.json())
    .catch(console.log)
};

export function getBudgets() {
  return generalFetch(budgetsUrl);
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

  return generalFetch(budgetsUrl, options);
};

export function updateBudget(id, budget) {
  const patchUrl = `${budgetsUrl}/${id}`;
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(budget)
  };

  return generalFetch(patchUrl, options);
} 

export function deleteBudget(id) {
  const deleteUrl = `${budgetsUrl}/${id}`;
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return generalFetch(deleteUrl, options);
}

export function getSettings() {
  return generalFetch(settingsUrl);
}

export function updateSettings(settings) {
  const patchUrl = settingsUrl;
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(settings)
  };

  return generalFetch(patchUrl, options);
} 
