import React, { useState } from 'react';
import CreateOptions from './CreateOptions';
import { handleChange } from '../../shared/handlers';

function CreateBudget() {
  const [showOptions, setShowOptions] = useState(false);
  const [budgetName, setBudgetName] = useState('');

  const openOptions = (e) => {
    e.preventDefault();

    if (budgetName) {
      setShowOptions(true);
    }
  };

  return (
    <div>
      <form>    
        <div className="new-budget-name">
          <input type="text" 
            placeholder="New Budget Name" 
            id="new-budget-name"
            onChange={(e) => handleChange(e, setBudgetName)}
            value={budgetName} />
          <button onClick={openOptions}>+</button>
        </div>
      </form>

      { showOptions ? 
        <CreateOptions 
          setShowOptions={setShowOptions} 
          budgetName={budgetName} /> : 
          '' 
      }
    </div>
    
  )
}

export default CreateBudget;
