import React from 'react';
import Item from './Item';
import { selectExpenditures } from '../../utils/selectors';
import { formatNumber } from '../../utils/format';
import { 
  calculatePeriodSpent, 
  calculateRemainingSpend 
} from '../../utils/calculate';

function Period({ title, expenditures, currency, budget, period }) {

  const budgetExpenditures = () => {
    const expendituresFromBudget = expenditures[budget.id];
    
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
      { displayExpenditures() }
      <ul>
        <li>
          Left to Spend (period): { currency }
            { formatNumber(calculateRemainingSpend({
              expenditures, budget, period})) }
        </li>
        <li>
          Spent (period): { currency }
            { formatNumber(calculatePeriodSpent({
              expenditures, budget, period})) }
        </li>
      </ul>
    </div>
  )
}

export default Period;