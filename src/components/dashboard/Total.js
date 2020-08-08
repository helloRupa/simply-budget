import React from 'react';
import { formatNumber } from '../../utils/format';
import { calculateTotalTracking } from '../../utils/calculate';

function Total({ budgets=[], expenditures, currency }) {
    return (
    <div>
      <span className="all-budgets-label">Total</span>
      <span className="all-budgets-total">
        {currency} 
        {formatNumber(calculateTotalTracking(budgets, expenditures))}
      </span>
    </div>
  )
}

export default Total;
