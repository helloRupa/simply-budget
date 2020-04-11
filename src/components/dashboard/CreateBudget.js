import React from 'react';

function CreateBudget() {
  return (
    <form>
      <div className="new-budget-options">
        <span>I want to spend </span>
        <input type="text" placeholder="$" id="new-budget-currency" />
        <input type="number" placeholder="100" id="new-budget-limit" />
        <span>per </span>
        <select>
          <option>Week</option>
          <option>Month</option>
        </select>
      </div>
    
      <div className="new-budget-name">
        <input type="text" placeholder="New Budget Name" id="new-budget-name" />
        <button>+</button>
      </div>
    </form>
  )
}

export default CreateBudget;