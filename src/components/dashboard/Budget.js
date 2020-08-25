import React, { useState } from 'react';
import BudgetSettings from './BudgetSettings';
import { selectBudget } from '../../actions/budget_actions';
import { connect } from 'react-redux';
import { formattedSingleBudgetTracking } from '../../utils/calculate';

function Budget({ 
  budget, 
  budget: { name, currency, currentPeriod }, 
  selectBudget, 
  expenditures,
  setShowBudget
}) {
  const [showBudgetSettings, setShowBudgetSettings] = useState(false);

  const handleClick = () => {
    if (currentPeriod > 0) {
      selectBudget(budget);
      setShowBudget(true);
    }
  };

  return (
    <div>
      <button onClick={() => setShowBudgetSettings(true)}>Edit</button>
      <span onClick={handleClick}>
        <span className="budget-name">{name}</span>
        <span className="budget-currency">{currency}</span>
        <span className="budget-tracking">
          {formattedSingleBudgetTracking(expenditures, budget)}
        </span>
      </span>

      <div>
        {showBudgetSettings ? 
          <BudgetSettings {...{ budget, setShowBudgetSettings }} /> : null
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  expenditures: state.expenditures
});

export default connect(mapStateToProps, { selectBudget })(Budget);
