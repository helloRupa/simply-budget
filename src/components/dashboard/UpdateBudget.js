import React, { useState, useEffect } from 'react';
import FormHOC from '../../shared/FormHOC';
import { patchBudget } from '../../actions/budget_actions';
import { connect } from 'react-redux';
import DateComp from '../../shared/DateComp';
import { calculatePeriodFromToday } from '../../utils/calculate';

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
      const currentPeriod = calculatePeriodFromToday({ 
        startDate, 
        frequency: budget.frequency 
      });
      patchBudget(budget.id, { name, startDate, currentPeriod });
      close();
    }
  };
  
  useEffect(() => {
    setShouldDisableDate(Date.now() >= new Date(startDate));
    // eslint-disable-next-line 
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder={budget.name}
        onChange={e => handleChange(e, setName)}
        value={name} />
      <DateComp 
        setStartDate={setStartDate} 
        disabled={shouldDisableDate} 
        date={startDate} />
      <input type="submit" value="Update" />

      <Error msg="Budget name is required" condition={!name} />
    </form>
  )
}

export default connect(null, { patchBudget })(FormHOC(UpdateBudget));