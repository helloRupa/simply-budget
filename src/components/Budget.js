import React from 'react';
import Form from './budget/Form';
import Expenditures from './budget/Expenditures';

function Budget({ budget }) {
  

  return (
    <div>
      <h2>Budget Name</h2>
      <p>Spend $100.00 per Week or less!</p>

      <ul>
        <li>Tracking (lifetime): -$20.00</li>
        <li>Spent (lifetime): $678.90</li>
      </ul>

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