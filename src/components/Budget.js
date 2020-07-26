import React, { useState, useEffect } from 'react';
import Form from './budget/Form';
import Expenditures from './budget/Expenditures';
import { getBudgetExpenditures } from '../utils/comms';
import { selectExpenditures } from '../utils/selectors';
import { formatNumber } from '../utils/format';
// populate expenditures, handle empty expenditures
// show current and old expenditures
// show another period when clicking button
// add an expenditure

// show error messages for forms

function Budget({ budget: { id, name, currency, limit=500, frequency, truncatedValue=0, currentPeriod } }) {
  const [expenditures, setExpenditures] = useState([]);

  useEffect(() => {
    getBudgetExpenditures(id)
      .then(setExpenditures);
  }, [id]);

  const totalSpentForPeriod = () => {
    const currentExpends = selectExpenditures(expenditures, currentPeriod);
    return currentExpends.reduce((total, item) => total + item.amount, 0);
  };

  // current period only
  const currentTracking = () => limit - totalSpentForPeriod();

  const totalSpentForLifetime = () => expenditures.reduce((total, item) => total + item.amount, 0);

  const lifetimeTracking = () => limit * currentPeriod - truncatedValue - totalSpentForLifetime();

  return (
    <div>
      <h2>{ name }</h2>
      <p>Spend { currency }{ formatNumber(limit) } per { frequency } or less!</p>
      <p>Tracking (lifetime): { currency }{ formatNumber(lifetimeTracking()) }</p>

      <ul>
        <li>Left to Spend (period): { currency }{ formatNumber(currentTracking()) }</li>
        <li>Spent (period): { currency }{ formatNumber(totalSpentForPeriod()) }</li>
      </ul>

      <Expenditures 
        expenditures={expenditures} 
        currentPeriod={currentPeriod} 
        currency={currency} 
        setExpenditures={setExpenditures}
      />
      <button>Load More</button>
      <Form />
    </div>
  )
}

export default Budget;