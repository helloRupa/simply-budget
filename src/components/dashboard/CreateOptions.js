import React, { useState } from 'react';

/*
TODO: Factor out handleChange
      Save and close only if data is filled in
      Error message if data is wrong
*/

function CreateOptions({ setShowOptions, budgetName }) {
  const [currency, setCurrency] = useState('');
  const [limit, setLimit] = useState('');
  const [frequency, setFrequency] = useState('week');

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
      <button onClick={saveOptions}>Save Budget</button>
      <button onClick={closeOptions}>Cancel</button>
    </div>
  )
}

export default CreateOptions;