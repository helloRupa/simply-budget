import React, { useState } from 'react';
import CreateOptions from './CreateOptions';
import { handleChange } from '../../utils/handlers';
import Error from '../../shared/Error';

function CreateBudget({ setBudgets }) {
  const [showOptions, setShowOptions] = useState(false);
  const [budgetName, setBudgetName] = useState('');
  const [showError, setShowError] = useState(false);

  const openOptions = e => {
    e.preventDefault();

    if (budgetName) {
      setShowOptions(true);
      setShowError(false);
    } else {
      if (!showOptions) {
        setShowError(true);
      }
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

      <Error msg="Budget name is required" condition={showError} />

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
