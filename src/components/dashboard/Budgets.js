import React from 'react';
import Budget from './Budget';

function Budgets({ budgets=[] }) {
  const noBudgets = () => 
    budgets.length === 0 ? <li>You don't have any budgets</li> : null;

  return (
    <ul>
      { noBudgets() }
      { budgets.map(budget => 
        <li key={budget.id}>
          <Budget {...{ budget }} />
        </li>) }
    </ul>
  )
}

export default Budgets;