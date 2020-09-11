import React, { useState } from 'react';
import BudgetSettings from './BudgetSettings';
import { selectBudget } from '../../actions/budget_actions';
import { connect } from 'react-redux';
import { formattedSingleBudgetTracking } from '../../utils/calculate';
import { chooseBudget } from '../../actions/ui_actions';
import { displayDate } from '../../utils/format';

function Budget({ 
  budget, 
  budget: { name, currency, currentPeriod, startDate }, 
  selectBudget, 
  expenditures,
  chooseBudget
}) {
  const [showBudgetSettings, setShowBudgetSettings] = useState(false);

  const handleClick = () => {
    if (currentPeriod > 0) {
      selectBudget(budget);
      chooseBudget();
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
        <span>Start Date: {displayDate(startDate)}</span>
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

export default connect(mapStateToProps, { selectBudget, chooseBudget })(Budget);
