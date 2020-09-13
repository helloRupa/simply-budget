import React, { useState } from 'react';
import { connect } from 'react-redux';
import { 
  postExpenditure, 
  truncateExpenditures } from '../../actions/expenditure_actions';
import { earliestPeriod } from '../../utils/selectors';
import ExpenditureForm from './ExpenditureForm';

function AddExpenditure({ 
  budget, 
  budget: { currency, currentPeriod, startDate }, 
  postExpenditure, 
  truncateExpenditures,
  expenditures,
  maxLength,
  setIsTruncating
}) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [showError, setShowError] = useState(false);

  // Only truncate periods earlier than current period when over limit
  const handleTruncation = () => {
    if (expenditures.length >= maxLength && 
      earliestPeriod(expenditures) !== currentPeriod) {
        setIsTruncating(true);
        truncateExpenditures(expenditures, budget)
        .then(_ => setTimeout(() => setIsTruncating(false), 2500));
    }
  };

  const reset = () => {
    setTitle('');
    setAmount('');
    setShowError(false);
    setExpenseDate('');
  };

  const onSubmit = e => {
    if (amount !== '') {
      postExpenditure({ 
        title: title.trim(), 
        amount: parseFloat(amount), 
        date: expenseDate 
      }, budget)
      .then(_ => {
        handleTruncation();
      });

      reset();
    } else {
      setShowError(true);
    }
  };

  return (
    <>
    <ExpenditureForm {...{ 
      onSubmit, 
      title, 
      currency, 
      amount, 
      setAmount, 
      setTitle, 
      showError,
      expenseDate,
      setExpenseDate,
      startDate
    }} />
    </>
  )
}

const mapStateToProps = state => ({
  budget: state.budget.selected,
  maxLength: state.settings['max-length']
});

export default connect(mapStateToProps, { 
  postExpenditure, 
  truncateExpenditures
})(AddExpenditure);