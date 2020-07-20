import React from 'react';
import { formatNumber } from '../../utils/format';

function Total({ budgets }) {
  const calculateTotal = () => 
    budgets.reduce((total, budget) => budget.tracking + total, 0);

  const displayTotal = () => formatNumber(calculateTotal());

  return (
    <div>
      <span className="all-budgets-label">Total</span>
      <span className="all-budgets-total">{displayTotal()}</span>
    </div>
  )
}

export default Total;