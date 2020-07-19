import React from 'react';
import Budget from './Budget';

function Budgets({ budgets, removeBudget, selectBudget }) {
  const noBudgets = () => budgets.length === 0 ? <li>You don't have any budgets</li> : '';

  return (
    <ul>
      { noBudgets() }
      { budgets.map(budget => 
        <li key={budget.id}>
          <Budget budget={budget} removeBudget={removeBudget} selectBudget={selectBudget} />
        </li>) }
    </ul>
  )
}

export default Budgets;