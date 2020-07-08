import { formatNumber } from './format';

const baseUrl = 'http://localhost:8000';
const budgetsUrl = `${baseUrl}/budgets`;
const settingsUrl = `${baseUrl}/settings/1`;

function createOptions(method, body={}) {
  return {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
}

function generalFetch(url, options) {
  return fetch(url, options)
    .then(res => res.json())
    .catch(console.log)
}

function changeData(url, method, body={}) {
  const options = createOptions(method, body);

  return generalFetch(url, options);
}

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

  return changeData(budgetsUrl, 'POST', budgetObj);
};

export function updateBudget(id, budget) {
  const patchUrl = `${budgetsUrl}/${id}`;
  return changeData(patchUrl, 'PATCH', budget);
} 

export function deleteBudget(id) {
  const deleteUrl = `${budgetsUrl}/${id}`;
  return changeData(deleteUrl, 'DELETE');
}

export function getSettings() {
  return generalFetch(settingsUrl);
}

export function updateSettings(settings) {
  return changeData(settingsUrl, 'PATCH', settings);
} 
