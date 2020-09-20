import React, { useState } from 'react';
import { newBudget } from '../../actions/budget_actions';
import { connect } from 'react-redux';
import Form from '../../shared/Form';
import CancelButton from '../../shared/CancelButton';
import DateComp from '../../shared/DateComp';
import { periodOptions } from '../../constants/general';
import SubmitButton from '../../shared/SubmitButton';
import NumberInput from '../../shared/NumberInput';
import TextInput from '../../shared/TextInput';
import Error from '../../shared/Error';
import Select from '../../shared/Select';
import { scrollToEl } from '../../utils/uiBehavior';

function CreateOptions({ 
  setShowOptions, 
  budgetName, 
  setBudgetName, 
  newBudget, 
  defaultCurrency
}) {
  const [currency, setCurrency] = useState(defaultCurrency);
  const [limit, setLimit] = useState('');
  const [frequency, setFrequency] = useState(periodOptions.default);
  const [startDate, setStartDate] = useState('');

  const close = () => {
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
        name: budgetName.trim()
      };
      
      newBudget(budgetSettings)
      .then(data => {
        setTimeout(() => scrollToEl(`budget-${data.budget.id}`), 1);
      });
      close();
    }
  };

  const showError = () => !(currency && limit && budgetName);

  const makeOptions = () => {
    const options = [];

    for (const key in periodOptions) {
      if (key === 'default') {
        continue;
      }
      
      const value = periodOptions[key].value;

      options.push(<option key={value} value={value}>{periodOptions[key].display}</option>)
    }

    return options;
  };

  return <div className="modal-background">
    <Form callback={saveOptions} className="modal create-budget-options">
      <h2>{budgetName}</h2>

      <div>
        <span>I want to spend </span>
        <TextInput 
          placeholder="$" 
          callback={setCurrency} 
          value={currency}
          maxLength="2"
          className="currency"
          autoFocus={true} />

        <NumberInput value={limit} callback={setLimit} className="amount" />

        <span>per </span>

        <Select 
          callback={setFrequency} 
          value={frequency} 
          optionsCallback={makeOptions} />
      </div>

      <div>
        <label>
          Optionally, choose a start date: 
          <DateComp setStartDate={setStartDate} date={startDate} />
        </label>
      </div>

      <Error msg="All details are required, except date" condition={showError()} />
      
      <div className="buttons">
        <SubmitButton value="Save" />
      
        <CancelButton callback={close} />
      </div>
      
    </Form>
  </div>
}

const mapStateToProps = state => ({
  defaultCurrency: state.settings['default-currency']
});

export default connect(mapStateToProps, { newBudget })(CreateOptions);
