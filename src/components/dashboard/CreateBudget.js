import React, { useState } from 'react';
import CreateOptions from './CreateOptions';

function CreateBudget() {
  const [showOptions, setShowOptions] = useState(false);
  const [budgetName, setBudgetName] = useState('');

  const openOptions = (e) => {
    e.preventDefault();

    if (budgetName) {
      setShowOptions(true);
    }
  };

  const setName = (e) => {
    setBudgetName(e.target.value);
  };

  return (
    <div>
      <form>    
        <div className="new-budget-name">
          <input type="text" 
            placeholder="New Budget Name" 
            id="new-budget-name"
            onChange={setName}
            value={budgetName} />
          <button onClick={openOptions}>+</button>
        </div>
      </form>

      { showOptions ? 
        <CreateOptions 
          setShowOptions={setShowOptions} 
          budgetName={budgetName} /> : '' 
      }
    </div>
    
  )
}

export default CreateBudget;