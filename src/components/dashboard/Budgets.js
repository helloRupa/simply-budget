import React from 'react';
import Budget from './Budget';

function Budgets({ budgets }) {
  return (
    <ul>
      { budgets.map(budget => <li key={budget.id}><Budget budget={budget}/></li>) }
    </ul>
  )
}

export default Budgets;