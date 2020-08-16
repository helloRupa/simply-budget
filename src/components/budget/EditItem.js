import React, { useState } from 'react';
import FormHOC from '../../shared/FormHOC';
import { patchExpenditure } from '../../actions/expenditure_actions';
import { connect } from 'react-redux';
import Error from '../../shared/Error';

function EditItem({ 
  item: { id, title, amount }, 
  currency, 
  setShowEdit, 
  patchExpenditure,
  handleChange,
  handleAmountChange
}) {
  const [newTitle, setTitle] = useState(title);
  const [newAmount, setAmount] = useState(amount);

  const close = () => {
    setShowEdit(false);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (newAmount !== '') {
      patchExpenditure(id, { 
        title: newTitle, 
        amount: parseFloat(newAmount) 
      });
      
      close();
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
      <button onClick={() => close()}>Cancel</button>

      <Error msg="Amount is required" condition={ newAmount === '' } />
    </form>
  )
}

export default connect(null, { patchExpenditure })(FormHOC(EditItem));
