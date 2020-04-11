import React from 'react';

function CreateOptions({ setShowOptions, budgetName }) {
  const closeOptions = () => {
    setShowOptions(false);
  };

  return (
    <div className="new-budget-options">
      <h2>{budgetName}</h2>
      <span>I want to spend </span>
      <input type="text" placeholder="$" id="new-budget-currency" />
      <input type="number" placeholder="100" id="new-budget-limit" />
      <span>per </span>
      <select>
        <option>Week</option>
        <option>Month</option>
      </select>
      <button onClick={closeOptions}>Save Budget</button>
      <button onClick={closeOptions}>Cancel</button>
    </div>
  )
}

export default CreateOptions;