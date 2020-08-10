import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postExpenditure, truncateExpenditures } from '../../actions/expenditure_actions';
import { handleChange, handleAmountChange } from '../../utils/handlers';
import Error from '../../shared/Error';

function Form({ 
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

  const onSubmit = e => {
    e.preventDefault();

    if (amount !== '') {
      postExpenditure({ title, amount: parseFloat(amount) }, budget)
      .then(_ => {
        if (expenditures.length > maxLength && expenditures[0].period !== currentPeriod) {
          console.log('will truncate')
          truncateExpenditures(expenditures, budget);
        }
      });
      setShowError(false);
      setTitle('');
      setAmount('');
    } else {
      setShowError(true);
    }
  };

  return <form onSubmit={onSubmit}>
    <input 
      type="text" 
      placeholder="Expenditure name (optional)" 
      value={title}
      onChange={e => handleChange(e, setTitle)}
    />
    {currency}
    <input 
      type="text" 
      placeholder="20.60" 
      value={amount}
      onChange={e => handleAmountChange(e, setAmount)}
    />
    <input type="submit" value="Save" />
    <Error msg="Amount is required" condition={showError} />
  </form>
}

const mapStateToProps = state => ({
  budget: state.budget.selected,
  maxLength: state.settings['max-length']
});

export default connect(mapStateToProps, { 
  postExpenditure, 
  truncateExpenditures 
})(Form);