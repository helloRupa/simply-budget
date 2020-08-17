import React, { useState } from 'react';
import { connect } from 'react-redux';
import { 
  postExpenditure, 
  truncateExpenditures } from '../../actions/expenditure_actions';
import { earliestPeriod } from '../../utils/selectors';
import ExpenditureForm from './ExpenditureForm';

function AddExpenditure({ 
  budget, 
  budget: { currency, currentPeriod }, 
  postExpenditure, 
  truncateExpenditures,
  expenditures,
  maxLength
}) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [showError, setShowError] = useState(false);

  // Only truncate periods earlier than current period when over limit
  const handleTruncation = () => {
    if (expenditures.length >= maxLength && 
      earliestPeriod(expenditures) !== currentPeriod) {
      truncateExpenditures(expenditures, budget);
    }
  };

  const reset = () => {
    setTitle('');
    setAmount('');
    setShowError(false);
  };

  const onSubmit = e => {
    if (amount !== '') {
      postExpenditure({ title, amount: parseFloat(amount) }, budget)
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
      showError 
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