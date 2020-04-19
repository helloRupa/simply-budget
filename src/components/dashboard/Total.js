import React from 'react';

function Total({ budgets }) {
  const calculateTotal = () => budgets.reduce((total, budget) => parseFloat(budget.tracking) + total, 0);

  return (
    <div>
      <span className="all-budgets-label">Total</span>
      <span className="all-budgets-total">{calculateTotal()}</span>
    </div>
  )
}

export default Total;