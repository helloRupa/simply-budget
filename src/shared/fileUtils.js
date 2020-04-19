const url = 'http://localhost:8000/budgets';

const generalFetch = (url, options) => {
  return fetch(url, options)
    .then(res => res.json())
    .catch(console.log)
};

const formatLimit = limit => {
  const dotIndex = limit.indexOf('.');

  switch (dotIndex) {
    case -1:
      return `${limit}.00`;
    case limit.length - 1:
      return `${limit}00`;
    case limit.length - 2:
      return `${limit}0`;
    default:
      return limit;
  }
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
    limit: formatLimit(settingsObj.limit),
    startDate: `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`,
    tracking: `-${formatLimit(settingsObj.limit)}`,
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
