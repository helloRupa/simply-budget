import React from 'react';
import Item from './Item';
import { selectExpenditures } from '../../utils/selectors';

function Period({ title, expenditures, currency, budget, period }) {

  const budgetExpenditures = () => {
    const expendituresFromBudget = expenditures[budget.id];
    
    return expendituresFromBudget ? 
      selectExpenditures(expendituresFromBudget, period) :
      [];
  };

  const displayExpenditures = () => budgetExpenditures().length > 0 ? 
    <ul>
      { budgetExpenditures().map(item => <li>
        <Item item={item} currency={currency} />
      </li>) }
    </ul> : 'No expenses for this period';

  return (
    <div>
      <h3>{ title }</h3>
      { displayExpenditures() }
      {/* <ul>
        { expenditures.map(item => 
          <li>
            <Item 
              item={item} 
              currency={currency} 
            />
          </li>
        ) }
      </ul> */}
    </div>
  )
}

export default Period;