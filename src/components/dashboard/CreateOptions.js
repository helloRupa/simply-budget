import React, { useState } from 'react';
import { newBudget } from '../../actions/budget_actions';
import { connect } from 'react-redux';
import Form from '../../shared/Form';
import Close from '../../shared/Close';
import DateComp from '../../shared/DateComp';
import { periodOptions, periodDisplayOptions } from '../../constants/general';
import SubmitButton from '../../shared/SubmitButton';
import NumberInput from '../../shared/NumberInput';
import TextInput from '../../shared/TextInput';
import Error from '../../shared/Error';

function CreateOptions({ 
  setShowOptions, 
  budgetName, 
  setBudgetName, 
  newBudget, 
  defaultCurrency,
  handleChange
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

  const showError = () => !(currency && limit && budgetName);

  const makeOptions = () => {
    const options = [];

    for (const key in periodDisplayOptions) {
      options.push(<option key={key} value={key}>{periodDisplayOptions[key]}</option>)
    }

    return options;
  };

  return (
    <Form callback={saveOptions}>
      <h2>{budgetName}</h2>
      <span>I want to spend </span>

      <TextInput 
        placeholder="$" 
        callback={setCurrency} 
        value={currency}
        maxLength="2" />

      <NumberInput value={limit} callback={setLimit} />

      <span>per </span>
      <select onChange={e => handleChange(e, setFrequency)} value={frequency}>
        {makeOptions()}
      </select>
      <label>
        Choose a start date (optional): 
        <DateComp setStartDate={setStartDate} date={startDate} />
      </label>
      
      <SubmitButton value="Save Budget" />
      
      <Close callback={closeOptions} display='Cancel' />
      <Error msg="All details are required" condition={showError()} />
    </Form>
  )
}

const mapStateToProps = state => ({
  defaultCurrency: state.settings['default-currency']
});

export default connect(mapStateToProps, { newBudget })(CreateOptions);
