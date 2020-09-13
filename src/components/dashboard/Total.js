import React from 'react';
import { formattedTotalTracking, calculateTotalTracking } from '../../utils/calculate';

function Total({ budgets=[], expenditures, currency }) {
  const trackingClassName = calculateTotalTracking(budgets, expenditures) < 0 ? 'negative-tracking' : '';

    return (
    <div className="budget-total">
      <span className="label">Total</span>
      <span className={`amount ${trackingClassName}`}>
        {currency} 
        {formattedTotalTracking(budgets, expenditures)}
      </span>
    </div>
  )
}

export default Total;
