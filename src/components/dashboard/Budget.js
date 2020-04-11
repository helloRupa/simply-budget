import React, { useState } from 'react';
import BudgetMenu from './BudgetMenu';

function Budget() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = function() {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <button className="budget-menu" onClick={toggleMenu}>M</button>
      <span className="budget-name">Groceries</span>
      <span className="budget-currency">$</span>
      <span className="budget-tracking">+1,200.56</span>
      <div>{ showMenu ? <BudgetMenu /> : '' }</div>
    </div>
  )
}

export default Budget;