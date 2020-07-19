import React, { useState } from 'react';
import BudgetMenu from './BudgetMenu';

function Budget({ budget, budget: { name, currency, tracking }, removeBudget, selectBudget }) {
  const [showMenu, setShowMenu] = useState(false);
  const [budgetName, setBudgetName] = useState(name);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleClick = () => {
    selectBudget(budget.id);
  }

  return (
    <div>
      <button className="budget-menu" onClick={toggleMenu}>M</button>
      <span onClick={handleClick}>
        <span className="budget-name">{budgetName}</span>
        <span className="budget-currency">{currency}</span>
        <span className="budget-tracking">{tracking}</span>
      </span>
      <div>{ showMenu ? <BudgetMenu budget={budget} setBudgetName={setBudgetName} removeBudget={removeBudget} /> : '' }</div>
    </div>
  )
}

export default Budget;