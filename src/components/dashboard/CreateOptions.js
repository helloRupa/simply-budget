import React, { useState } from 'react';

function CreateOptions({ setShowOptions, budgetName }) {
  const [currency, setCurrency] = useState('');
  const [limit, setLimit] = useState('');

  const closeOptions = () => {
    setShowOptions(false);
  };

  const saveOptions = () => {
    // only save and close if currency and limit set
  };

  const handleChange = (e, callback) => {
    callback(e.target.value);
  };

  const handleLimit = (e) => {
    const regex = RegExp(/^\d+(\.\d?\d?)?$/);
    const value = e.target.value;

    if (regex.test(value) || !value) {
      handleChange(e, setLimit);
    }
  };

  return (
    <div className="new-budget-options">
      <h2>{budgetName}</h2>
      <span>I want to spend </span>
      <input 
        type="text"
        placeholder="$" 
        id="new-budget-currency" 
        onChange={(e) => handleChange(e, setCurrency)}
        value={currency}
        maxLength="2" />
      <input 
        type="text" 
        placeholder="100" 
        id="new-budget-limit"
        onChange={handleLimit}
        value={limit} />
      <span>per </span>
      <select>
        <option>Week</option>
        <option>Month</option>
      </select>
      <button onClick={saveOptions}>Save Budget</button>
      <button onClick={closeOptions}>Cancel</button>
    </div>
  )
}

export default CreateOptions;