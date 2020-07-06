import React, { useState } from 'react';
import BudgetMenu from './BudgetMenu';

function Budget({ budget, budget: { name, currency, tracking }, removeBudget }) {
  const [showMenu, setShowMenu] = useState(false);
  const [budgetName, setBudgetName] = useState(name);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <button className="budget-menu" onClick={toggleMenu}>M</button>
      <span className="budget-name">{budgetName}</span>
      <span className="budget-currency">{currency}</span>
      <span className="budget-tracking">{tracking}</span>
      <div>{ showMenu ? <BudgetMenu budget={budget} setBudgetName={setBudgetName} removeBudget={removeBudget} /> : '' }</div>
    </div>
  )
}

export default Budget;