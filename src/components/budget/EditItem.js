import React, { useState } from 'react';
import { handleChange, handleAmountChange } from '../../utils/handlers';
import { updateExpenditure, getBudgetExpenditures } from '../../utils/comms';
import Error from '../../shared/Error';

function EditForm({ item: { id, title, amount, budgetId }, currency, setShowEdit, setExpenditures }) {
  const [newTitle, setTitle] = useState(title);
  const [newAmount, setAmount] = useState(amount);

  const handleSubmit = e => {
    e.preventDefault();

    if (newAmount !== '') {
      updateExpenditure(id, { title: newTitle, amount: parseFloat(newAmount) })
      .then(() => {
        getBudgetExpenditures(budgetId)
        .then(setExpenditures);
      });

      setShowEdit(false);
    } 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={newTitle} 
        placeholder="Title (optional)" 
        onChange={e => { handleChange(e, setTitle) }}
      />
      { currency }
      <input 
        type="text" 
        value={newAmount} 
        onChange={e => { handleAmountChange(e, setAmount) }}
      />
      <input type="submit" value="Update Item" />
      <button onClick={() => { setShowEdit(false) }}>Cancel</button>

      <Error msg="Amount is required" condition={ newAmount === '' } />
    </form>
  )
}

export default EditForm;
