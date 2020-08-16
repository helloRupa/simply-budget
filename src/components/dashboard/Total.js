import React from 'react';
import { formattedTotalTracking } from '../../utils/calculate';

function Total({ budgets=[], expenditures, currency }) {
    return (
    <div>
      <span className="all-budgets-label">Total</span>
      <span className="all-budgets-total">
        {currency} 
        {formattedTotalTracking(budgets, expenditures)}
      </span>
    </div>
  )
}

export default Total;
