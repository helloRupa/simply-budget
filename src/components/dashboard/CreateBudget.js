import React, { useState } from 'react';
import CreateOptions from './CreateOptions';
import FormHOC from '../../shared/FormHOC';
import SubmitButton from '../../shared/SubmitButton';

function CreateBudget({ handleChange, Error }) {
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
            
          <SubmitButton value="+" />
        </div>
      </form>

      <Error msg="Budget name is required" condition={showError} />

      { showOptions ? 
        <CreateOptions 
          setShowOptions={setShowOptions} 
          setBudgetName={setBudgetName}
          budgetName={budgetName} /> : 
          '' 
      }
    </div>
  )
}

export default FormHOC(CreateBudget);
