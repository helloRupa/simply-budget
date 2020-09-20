import React, { useState } from 'react';
import '../../styles/create-budget.css';
import CreateOptions from './CreateOptions';
import Form from '../../shared/Form';
import SubmitButton from '../../shared/SubmitButton';
import TextInput from '../../shared/TextInput';
import Error from '../../shared/Error';

function CreateBudget() {
  const [showOptions, setShowOptions] = useState(false);
  const [budgetName, setBudgetName] = useState('');
  const [showError, setShowError] = useState(false);

  const openOptions = e => {
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
      <Form callback={openOptions} className="create-budget">    
          <TextInput 
            placeholder="New Budget Name" 
            callback={setBudgetName}
            value={budgetName} />
            
          <SubmitButton value="+" />
      </Form>

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

export default CreateBudget;
