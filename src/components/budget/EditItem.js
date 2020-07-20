import React, { useState } from 'react';
import { handleChange, handleAmountChange } from '../../utils/handlers';
import { updateExpenditure } from '../../utils/comms';

function EditForm({ item: { id, title, amount }, currency, setShowEdit }) {
  const [newTitle, setTitle] = useState(title);
  const [newAmount, setAmount] = useState(amount);

  const handleSubmit = e => {
    e.preventDefault();
    updateExpenditure(id, { title: newTitle, amount: parseFloat(newAmount) });
    setShowEdit(false);
  }

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
    </form>
  )
}

export default EditForm;
