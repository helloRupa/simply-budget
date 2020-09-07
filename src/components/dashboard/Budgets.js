import React, { useState, useEffect } from 'react';
import { budgetsByCurrency } from '../../utils/format';
import Budget from './Budget';
import Total from './Total';

function Budgets({ budgets=[], expenditures=[] }) {
  const [budgetGroups, setBudgetGroups] = useState({});

  useEffect(() => {
    setBudgetGroups(budgetsByCurrency(budgets));
  }, [budgets]);

  const noBudgets = () => 
    budgets.length === 0 ? <p>You don't have any budgets</p> : null;

  const sortBudgets = budgets => budgets.sort((a, b) => a.id - b.id);

  

  return <section>
    { noBudgets() }

    { Object.keys(budgetGroups).map(key => <ul key={key}>
      {sortBudgets(budgetGroups[key]).map(budget => 
        <li key={budget.id}>
          <Budget {...{ budget }} />
        </li>)}
        <Total budgets={budgetGroups[key]} expenditures={expenditures} currency={key} />
      </ul>)
    }
  </section>
}

export default Budgets;