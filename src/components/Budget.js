import React, { useState, useEffect } from 'react';
import Form from './budget/Form';
import Expenditures from './budget/Expenditures';
import { getBudgetExpenditures } from '../utils/comms';
import { selectExpenditures } from '../utils/selectors';
// populate expenditures, handle empty expenditures
// show current and old expenditures
// show another period when clicking button
// add an expenditure

function Budget({ budget: { id, name, currency, limit, frequency, tracking, currentPeriod } }) {
  const [expenditures, setExpenditures] = useState([]);

  useEffect(() => {
    getBudgetExpenditures(id)
      .then(setExpenditures);
  }, [id]);

  const totalSpentForPeriod = () => {
    const currentExpends = selectExpenditures(expenditures, currentPeriod);
    return currentExpends.reduce((total, item) => total + item.amount, 0);
  };

  const currentTracking = () => {
    // sum all expend amounts for current period
    // subtract from limit
    return parseFloat(limit) - totalSpentForPeriod();
  };

  return (
    <div>
      <h2>{ name }</h2>
      <p>Spend { currency }{ limit } per { frequency } or less!</p>
      <p>Tracking (lifetime): { currency }{ tracking }</p>

      <ul>
        <li>Left to Spend (period): { currency }{ currentTracking() }</li>
        <li>Spent (period): { currency }{ totalSpentForPeriod() }</li>
      </ul>

      <Expenditures expenditures={expenditures} currentPeriod={currentPeriod} currency={currency} />
      <button>Load More</button>
      <Form />
    </div>
  )
}

export default Budget;