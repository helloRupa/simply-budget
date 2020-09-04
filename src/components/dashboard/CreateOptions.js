import React, { useState } from 'react';
import FormHOC from '../../shared/FormHOC';
import { newBudget } from '../../actions/budget_actions';
import { connect } from 'react-redux';
import Close from '../../shared/Close';
import DateComp from '../../shared/DateComp';
import { periodOptions, periodDisplayOptions } from '../../constants/general';

function CreateOptions({ 
  setShowOptions, 
  budgetName, 
  setBudgetName, 
  newBudget, 
  defaultCurrency,
  handleAmountChange,
  handleChange,
  Error
}) {
  const [currency, setCurrency] = useState(defaultCurrency);
  const [limit, setLimit] = useState('');
  const [frequency, setFrequency] = useState(periodOptions.default);
  const [startDate, setStartDate] = useState('');

  const closeOptions = () => {
    setBudgetName('');
    setShowOptions(false);
  };

  const saveOptions = e => {
    e.preventDefault();

    if (currency && limit && budgetName) {
      const budgetSettings = { 
        currency, 
        frequency, 
        date: startDate,
        limit: parseFloat(limit),
        name: budgetName
      };
      
      newBudget(budgetSettings);
      closeOptions();
    }
  };

  const handleLimit = e => {
    handleAmountChange(e, setLimit);
  };

  const showError = () => !(currency && limit && budgetName);

  const makeOptions = () => {
    const options = [];

    for (const key in periodDisplayOptions) {
      options.push(<option key={key} value={key}>{periodDisplayOptions[key]}</option>)
    }

    return options;
  };

  return (
    <form className="new-budget-options" onSubmit={saveOptions}>
      <h2>{budgetName}</h2>
      <span>I want to spend </span>
      <input 
        type="text"
        placeholder="$" 
        id="new-budget-currency" 
        onChange={e => handleChange(e, setCurrency)}
        value={currency}
        maxLength="2" />
      <input 
        type="text" 
        placeholder="100" 
        id="new-budget-limit"
        onChange={handleLimit}
        value={limit} />
      <span>per </span>
      <select onChange={e => handleChange(e, setFrequency)} value={frequency}>
        {makeOptions()}
      </select>
      <label>
        Choose a start date (optional): 
        <DateComp setStartDate={setStartDate} date={startDate} />
      </label>
      
      <input type="submit" value="Save Budget" />
      
      <Close callback={closeOptions} display='Cancel' />
      <Error msg="All details are required" condition={showError()} />
    </form>
  )
}

const mapStateToProps = state => ({
  defaultCurrency: state.settings['default-currency']
});

export default connect(mapStateToProps, { newBudget })(FormHOC(CreateOptions));
