import React, { useState, useEffect } from 'react';
import { patchBudget } from '../../actions/budget_actions';
import { connect } from 'react-redux';
import DateComp from '../../shared/DateComp';
import { calculatePeriodFromToday } from '../../utils/calculate';
import Form from '../../shared/Form';
import SubmitButton from '../../shared/SubmitButton';
import TextInput from '../../shared/TextInput';
import Error from '../../shared/Error';

function UpdateBudget({ budget, close, patchBudget }) {
  const [name, setName] = useState(budget.name);
  const [startDate, setStartDate] = useState(budget.startDate);
  const [shouldDisableDate, setShouldDisableDate] = useState(false);

  const handleSubmit = e => {
    if (name.length > 0) {
      const budgetOptions = { name: name.trim() };

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
    <Form callback={handleSubmit}>
      <div>
        <TextInput 
          placeholder={budget.name} 
          callback={setName} 
          value={name}
          className="name-input"
          autoFocus={true} />

        <DateComp 
          setStartDate={setStartDate} 
          disabled={shouldDisableDate} 
          date={startDate} />
      </div>

      <Error msg="Budget name is required" condition={!name} />
      
      <SubmitButton value="Update" className="large-submit" />
    </Form>
  )
}

export default connect(null, { patchBudget })(UpdateBudget);
