import React, { useState } from 'react';
import { handleChange, handleAmountChange } from '../../utils/handlers';
import { patchExpenditure } from '../../actions/expenditure_actions';
import { connect } from 'react-redux';
import Error from '../../shared/Error';

function EditForm({ 
  item: { id, title, amount }, 
  currency, 
  setShowEdit, 
  patchExpenditure 
}) {
  const [newTitle, setTitle] = useState(title);
  const [newAmount, setAmount] = useState(amount);

  const handleSubmit = e => {
    e.preventDefault();

    if (newAmount !== '') {
      patchExpenditure(id, { 
        title: newTitle, 
        amount: parseFloat(newAmount) 
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

export default connect(null, { patchExpenditure })(EditForm);
