import React, { useState } from 'react';
import { handleChange, handleChangeWithRegex } from '../../utils/handlers';
import { createBudget, getBudgets } from '../../utils/comms';
import Error from '../../shared/Error';

function CreateOptions({ setShowOptions, budgetName, setBudgetName, setBudgets }) {
  const [currency, setCurrency] = useState('');
  const [limit, setLimit] = useState('');
  const [frequency, setFrequency] = useState('week');

  const closeOptions = () => {
    setBudgetName('');
    setShowOptions(false);
  };

  const saveOptions = e => {
    e.preventDefault();

    if (currency && limit && budgetName) {
      const budgetSettings = { currency, limit, frequency };
      budgetSettings.name = budgetName;

      createBudget(budgetSettings)
        .then(() => getBudgets().then(setBudgets));
      closeOptions();
    }
  };

  const handleLimit = e => {
    handleChangeWithRegex(e, /^\d+(\.\d?\d?)?$/, setLimit);
  };

  const showError = () => !(currency && limit && budgetName);

  return (
    <form className="new-budget-options" onSubmit={saveOptions}>
      <h2>{budgetName}</h2>
      <span>I want to spend </span>
      <input 
        type="text"
        placeholder="$" 
        id="new-budget-currency" 
        onChange={e => handleChange(e, setCurrency)}
        value={currency}
        maxLength="2" />
      <input 
        type="text" 
        placeholder="100" 
        id="new-budget-limit"
        onChange={handleLimit}
        value={limit} />
      <span>per </span>
      <select onChange={e => handleChange(e, setFrequency)} value={frequency}>
        <option value="week">Week</option>
        <option value="month">Month</option>
      </select>
      <input type="submit" value="Save Budget" />
      <button onClick={closeOptions}>Cancel</button>
      <Error msg="All details are required" condition={showError()} />
    </form>
  )
}

export default CreateOptions;