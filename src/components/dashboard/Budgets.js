import React, { useState, useEffect } from 'react';
import { budgetsByCurrency } from '../../utils/format';
import Budget from './Budget';
import Total from './Total';
import { sortByStartDateAsc } from '../../utils/format';

function Budgets({ budgets=[], expenditures=[] }) {
  const [budgetGroups, setBudgetGroups] = useState({});

  useEffect(() => {
    setBudgetGroups(budgetsByCurrency(budgets));
  }, [budgets]);

  const noBudgets = () => 
    budgets.length === 0 ? <p>You don't have any budgets</p> : null;

  return <section>
    { noBudgets() }

    { Object.keys(budgetGroups).map(key => <ul key={key}>
      {sortByStartDateAsc(budgetGroups[key]).map(budget => 
        <li key={budget.id}>
          <Budget {...{ budget }} />
        </li>)}
        <Total budgets={budgetGroups[key]} expenditures={expenditures} currency={key} />
      </ul>)
    }
  </section>
}

export default Budgets;