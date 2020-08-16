import React, { useEffect, useState } from 'react';
import { budgetsByCurrency } from '../../utils/format';
import Total from './Total';

function Totals({ budgets, expenditures }) {
  const [budgetGroups, setBudgetGroups] = useState({});

  useEffect(() => {
    setBudgetGroups(budgetsByCurrency(budgets));
  }, [budgets]);

  return (
    <>
      { Object.keys(budgetGroups).map(key => 
        <Total currency={key} 
          budgets={budgetGroups[key]} 
          expenditures={expenditures} 
          key={key}
        />) 
      }
    </>
  );
}

export default Totals;