const baseUrl = 'http://localhost:8000';
const budgetsUrl = `${baseUrl}/budgets`;
const settingsUrl = `${baseUrl}/settings/1`;
const expendituresUrl = `${baseUrl}/expenditures`;
const budgetExpendituresUrl = id => `${baseUrl}/budgets/${id}/expenditures`;

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
};

export function createBudget({ name, currency, frequency, limit }) {
  const date = new Date();
  const budgetObj =  {
    name: name,
    currency: currency,
    frequency: frequency,
    limit: limit,
    startDate: `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`,
    truncated: 0,
    currentPeriod: 1
  };

  return changeData(budgetsUrl, 'POST', budgetObj);
};

export function updateBudget(id, budget) {
  const patchUrl = `${budgetsUrl}/${id}`;
  return changeData(patchUrl, 'PATCH', budget);
};

export function deleteBudget(id) {
  const deleteUrl = `${budgetsUrl}/${id}`;
  return changeData(deleteUrl, 'DELETE');
};

export function getSettings() {
  return generalFetch(settingsUrl);
};

export function updateSettings(settings) {
  return changeData(settingsUrl, 'PATCH', settings);
};

export function getExpenditures() {
  return generalFetch(expendituresUrl);
};

export function getBudgetExpenditures(id) {
  return generalFetch(budgetExpendituresUrl(id));
};

export function updateExpenditure(id, expenditure) {
  return changeData(`${expendituresUrl}/${id}`, 'PATCH', expenditure);
};

export function deleteExpenditure(id) {
  const deleteUrl = `${expendituresUrl}/${id}`;
  return changeData(deleteUrl, 'DELETE');
};
