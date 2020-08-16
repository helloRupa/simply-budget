import React from 'react';
import Item from './Item';
import { selectExpenditures, selectBudgetExpenditures } from '../../utils/selectors';
import { formattedPeriodSpent, formattedRemainingSpend } from '../../utils/calculate';

function Period({ title, expenditures, currency, budget, period }) {

  const budgetExpenditures = () => {
    const expendituresFromBudget = selectBudgetExpenditures(expenditures, budget);
    
    return expendituresFromBudget ? 
      selectExpenditures(expendituresFromBudget, period) :
      [];
  };

  const displayExpenditures = () => budgetExpenditures().length > 0 ? 
    <ul>
      { budgetExpenditures().map(item => <li key={`exp-${item.id}`}>
        <Item {...{ item, currency }} />
      </li>) }
    </ul> : 'No expenses for this period';

  return (
    <div>
      <h3>{ title }</h3>
      {displayExpenditures()}
      <ul>
        <li>
          Left to Spend (period): { currency }
          {formattedRemainingSpend(expenditures, budget, period)}
        </li>
        <li>
          Spent (period): { currency }
            {formattedPeriodSpent(expenditures, budget, period)}
        </li>
      </ul>
    </div>
  )
}

export default Period;