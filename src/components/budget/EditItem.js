import React, { useState } from 'react';
import FormHOC from '../../shared/FormHOC';
import { patchExpenditure } from '../../actions/expenditure_actions';
import { connect } from 'react-redux';
import Close from '../../shared/Close';
import ExpenditureForm from './ExpenditureForm';

function EditItem({ 
  item: { id, title, amount }, 
  currency, 
  setShowEdit, 
  patchExpenditure,
  handleChange,
  handleAmountChange,
  Error
}) {
  const [newTitle, setTitle] = useState(title);
  const [newAmount, setAmount] = useState(amount);

  const close = () => {
    setShowEdit(false);
  };

  const onSubmit = e => {
    if (newAmount !== '') {
      patchExpenditure(id, { 
        title: newTitle, 
        amount: parseFloat(newAmount) 
      });
      
      close();
    } 
  };

  return (
    <>
      <ExpenditureForm 
        onSubmit={onSubmit}
        title={newTitle}
        handleTextChange={e => { handleChange(e, setTitle) }}
        currency={currency}
        amount={newAmount}
        handleCostChange={e => { handleAmountChange(e, setAmount) }}
      />
      <Close callback={close} display='Cancel' />
      <Error msg="Amount is required" condition={ newAmount === '' } />
    </>
  )
}

export default connect(null, { patchExpenditure })(FormHOC(EditItem));
