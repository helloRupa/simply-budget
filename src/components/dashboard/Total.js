import React from 'react';
import { formattedTotalTracking } from '../../utils/calculate';

function Total({ budgets=[], expenditures, currency }) {
    return (
    <div className="budget-total">
      <span className="label">Total</span>
      <span className="amount">
        {currency} 
        {formattedTotalTracking(budgets, expenditures)}
      </span>
    </div>
  )
}

export default Total;
