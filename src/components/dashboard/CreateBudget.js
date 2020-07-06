import React, { useState } from 'react';
import CreateOptions from './CreateOptions';
import { handleChange } from '../../shared/handlers';

function CreateBudget({ setBudgets }) {
  const [showOptions, setShowOptions] = useState(false);
  const [budgetName, setBudgetName] = useState('');

  const openOptions = e => {
    e.preventDefault();

    if (budgetName) {
      setShowOptions(true);
    }
  };

  return (
    <div>
      <form onSubmit={openOptions}>    
        <div className="new-budget-name">
          <input type="text" 
            placeholder="New Budget Name" 
            id="new-budget-name"
            onChange={(e) => handleChange(e, setBudgetName)}
            value={budgetName} />
          <input type="submit" value="+" />
        </div>
      </form>

      { showOptions ? 
        <CreateOptions 
          setBudgets={setBudgets}
          setShowOptions={setShowOptions} 
          setBudgetName={setBudgetName}
          budgetName={budgetName} /> : 
          '' 
      }
    </div>
    
  )
}

export default CreateBudget;
