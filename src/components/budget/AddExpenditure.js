import React, { useState } from 'react';
import { connect } from 'react-redux';
import { 
  postExpenditure, 
  truncateExpenditures } from '../../actions/expenditure_actions';
import FormHOC from '../../shared/FormHOC';
import { patchSettings } from '../../actions/settings_actions';
import { earliestPeriod } from '../../utils/selectors';

function AddExpenditure({ 
  budget, 
  budget: { currency, currentPeriod }, 
  postExpenditure, 
  truncateExpenditures,
  expenditures,
  maxLength,
  categories,
  patchSettings,
  handleChange,
  handleAmountChange,
  Error
}) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [showError, setShowError] = useState(false);

  // Only truncate periods earlier than current period when over limit
  const handleTruncation = () => {
    if (expenditures.length > maxLength && 
      earliestPeriod(expenditures) !== currentPeriod) {
      truncateExpenditures(expenditures, budget);
    }
  };

  const handleCategory = title => {
    if (!categories.includes(title)) {
      patchSettings({ categories: [...categories, title] });
    }
  };

  const onSubmit = e => {
    e.preventDefault();

    if (amount !== '') {
      postExpenditure({ title, amount: parseFloat(amount) }, budget)
      .then(_ => {
        handleTruncation();
        handleCategory(title);
      });

      setTitle('');
      setAmount('');
      setShowError(false);
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
      list="saved-categories"
    />
    <datalist id="saved-categories">
      { categories.map(name => <option value={name} key={name} />) }
    </datalist>
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
  maxLength: state.settings['max-length'],
  categories: state.settings.categories
});

export default connect(mapStateToProps, { 
  postExpenditure, 
  truncateExpenditures,
  patchSettings
})(FormHOC(AddExpenditure));