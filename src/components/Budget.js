import React from 'react';
import Form from './budget/Form';
import Expenditures from './budget/Expenditures';

function Budget({ budget: { id, name, currency, limit, frequency, tracking } }) {
  
  return (
    <div>
      <h2>{ name }</h2>
      <p>Spend { currency }{ limit } per { frequency } or less!</p>
      <p>Tracking (lifetime): { currency }{ tracking }</p>

      <ul>
        <li>Tracking (period): -$56.00</li>
        <li>Spent (period): $30.00</li>
      </ul>

      <Expenditures />
      <Form />
    </div>
  )
}

export default Budget;