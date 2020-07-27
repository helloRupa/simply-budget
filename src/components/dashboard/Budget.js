import React, { useState } from 'react';
import BudgetMenu from './BudgetMenu';
import { formatNumber } from '../../utils/format';
import { selectBudget } from '../../actions/budget_actions';
import { connect } from 'react-redux';
import { calculateTracking } from '../../utils/calculate';

function Budget({ 
  budget, 
  budget: { name, currency }, 
  selectBudget, 
  expenditures
}) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleClick = () => {
    selectBudget(budget);
  };

  return (
    <div>
      <button className="budget-menu" onClick={toggleMenu}>M</button>
      <span onClick={handleClick}>
        <span className="budget-name">{name}</span>
        <span className="budget-currency">{currency}</span>
        <span className="budget-tracking">
          {formatNumber(calculateTracking({expenditures, budget}))}
        </span>
      </span>
      <div>
        { showMenu ? 
          <BudgetMenu budget={budget} setShowMenu={setShowMenu} /> : '' }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  expenditures: state.expenditures
});

export default connect(mapStateToProps, { selectBudget })(Budget);
