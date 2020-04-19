import React, { useState } from 'react';
import BudgetMenu from './BudgetMenu';

function Budget({ budget: { name, currency, tracking } }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <button className="budget-menu" onClick={toggleMenu}>M</button>
      <span className="budget-name">{name}</span>
      <span className="budget-currency">{currency}</span>
      <span className="budget-tracking">{tracking}</span>
      <div>{ showMenu ? <BudgetMenu /> : '' }</div>
    </div>
  )
}

export default Budget;