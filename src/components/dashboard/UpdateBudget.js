import React, { useState, useEffect } from 'react';
import FormHOC from '../../shared/FormHOC';
import { patchBudget } from '../../actions/budget_actions';
import { connect } from 'react-redux';
import DateComp from '../../shared/DateComp';
import { calculatePeriodFromToday } from '../../utils/calculate';
import SubmitButton from '../../shared/SubmitButton';
import TextInput from '../../shared/TextInput';

function UpdateBudget({ 
  budget, 
  close,
  patchBudget, 
  handleChange, 
  Error 
}) {
  const [name, setName] = useState(budget.name);
  const [startDate, setStartDate] = useState(budget.startDate);
  const [shouldDisableDate, setShouldDisableDate] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    if (name.length > 1) {
      const budgetOptions = { name };

      if (startDate) {
        const currentPeriod = calculatePeriodFromToday({ 
          startDate, 
          frequency: budget.frequency 
        });

        budgetOptions.startDate = startDate;
        budgetOptions.currentPeriod = currentPeriod;
      }

      patchBudget(budget.id, budgetOptions);
      close();
    }
  };
  
  useEffect(() => {
    setShouldDisableDate(Date.now() >= new Date(startDate));
    // eslint-disable-next-line 
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <TextInput 
        placeholder={budget.name} 
        callback={setName} 
        value={name} />

      <DateComp 
        setStartDate={setStartDate} 
        disabled={shouldDisableDate} 
        date={startDate} />

      <SubmitButton value="Update" />

      <Error msg="Budget name is required" condition={!name} />
    </form>
  )
}

export default connect(null, { patchBudget })(FormHOC(UpdateBudget));