import React, { useState } from 'react';
import { connect } from 'react-redux';
import { 
  postExpenditure, 
  truncateExpenditures } from '../../actions/expenditure_actions';
import { earliestPeriod } from '../../utils/selectors';
import { scrollToEl } from '../../utils/uiBehavior';
import ExpenditureForm from './ExpenditureForm';
import SimpleExpenditureForm from './SimpleExpenditureForm';

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
  const [showExpenditureForm, setShowExpenditureForm] = useState(false);

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
    setShowExpenditureForm(false);
  };

  const loadUntilFound = id => {
    const loadMoreBtn = document.getElementById('load-more');

    while (!document.getElementById(id)) {
      loadMoreBtn.click();
    }
  };

  const onSubmit = e => {
    if (amount !== '') {
      postExpenditure({ 
        title: title.trim(), 
        amount: parseFloat(amount), 
        date: expenseDate 
      }, budget)
      .then(exp => {
        handleTruncation();
        setTimeout(() => {
          const id = `exp-${exp.expenditure.id}`;
          
          loadUntilFound(id);
          scrollToEl(id);
        }, 1);
      });

      reset();
    } else {
      setShowError(true);
    }
  };

  const clickCallback = () => {
    setShowExpenditureForm(true);
  };

  return (
    <>
    <SimpleExpenditureForm 
      {...{ currency, amount, setAmount }} 
      holdCallback={onSubmit} 
      clickCallback={clickCallback} />

    { showExpenditureForm ? <ExpenditureForm close={reset} {...{ 
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
    }} /> : null }
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
