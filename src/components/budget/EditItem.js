import React, { useState } from 'react';
import { patchExpenditure } from '../../actions/expenditure_actions';
import { connect } from 'react-redux';
import Close from '../../shared/Close';
import ExpenditureForm from './ExpenditureForm';

function EditItem({ 
  item: { id, title, amount }, 
  currency, 
  setShowEdit, 
  patchExpenditure
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
      <ExpenditureForm {...{ onSubmit, setTitle, currency, setAmount }}
        title={newTitle}
        amount={newAmount}
        showError={newAmount === ''}
      />
      <Close callback={close} display='Cancel' />
    </>
  )
}

export default connect(null, { patchExpenditure })(EditItem);
