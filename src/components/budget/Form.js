import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postExpenditure } from '../../actions/expenditure_actions';
import { handleChange, handleAmountChange } from '../../utils/handlers';

function Form({ budget, budget: { currency }, postExpenditure }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    postExpenditure({ title, amount: parseFloat(amount) }, budget);
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
  </form>
}

const mapStateToProps = state => ({
  budget: state.budget.selected
});

export default connect(mapStateToProps, { postExpenditure })(Form);