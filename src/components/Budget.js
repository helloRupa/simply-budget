import React, { useState, useEffect } from 'react';
import Form from './budget/Form';
import Expenditures from './budget/Expenditures';
import { getBudgetExpenditures } from '../utils/comms';

function Budget({ budget: { id, name, currency, limit, frequency, tracking } }) {
  const [expenditures, setExpenditures] = useState({});

  useEffect(() => {
    getBudgetExpenditures(id)
      .then(setExpenditures);
  }, [id]);

  return (
    <div>
      <h2>{ name }</h2>
      <p>Spend { currency }{ limit } per { frequency } or less!</p>
      <p>Tracking (lifetime): { currency }{ tracking }</p>

      <ul>
        <li>Tracking (period): -$56.00</li>
        <li>Spent (period): $30.00</li>
      </ul>

      <Expenditures expenditures={expenditures} />
      <Form />
    </div>
  )
}

export default Budget;