import React, { useState } from 'react';
import { patchExpenditure } from '../../actions/expenditure_actions';
import { connect } from 'react-redux';
import Close from '../../shared/Close';
import ExpenditureForm from './ExpenditureForm';
import { calculatePeriod } from '../../utils/calculate';

function EditItem({ 
  item: { id, title, amount, date }, 
  currency, 
  setShowEdit, 
  patchExpenditure,
  budget,
  budget: { startDate }  
}) {
  const [newTitle, setTitle] = useState(title);
  const [newAmount, setAmount] = useState(amount);
  const [expenseDate, setExpenseDate] = useState(date);

  const close = () => {
    setShowEdit(false);
  };

  const onSubmit = e => {
    if (newAmount !== '') {
      const expDate = expenseDate || date;

      patchExpenditure(id, { 
        title: newTitle.trim(), 
        amount: parseFloat(newAmount),
        date: expDate,
        period: calculatePeriod(expDate, budget)
      });
      
      close();
    } 
  };

  return (
    <>
      <ExpenditureForm {...{ 
        onSubmit, 
        setTitle, 
        currency, 
        setAmount, 
        expenseDate,
        setExpenseDate,
        startDate }}
        title={newTitle}
        amount={newAmount}
        showError={newAmount === ''}
      />
      <Close callback={close} display='Cancel' />
    </>
  )
}

export default connect(null, { patchExpenditure })(EditItem);
