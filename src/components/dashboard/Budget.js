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
    <>
      <div className="budget-menu-item">
        <div className="flex-horizontal">
        <button onClick={() => setShowBudgetSettings(true)}>Edit</button>
        <div onClick={handleClick} className="budget-menu-item-details">
          <span className="budget-name">{name}</span>
          <span className="budget-tracking">
            {currency}{formattedSingleBudgetTracking(expenditures, budget)}
          </span>
        </div>
        </div>

        <p className="start-date">Start Date: {displayDate(startDate)}</p>
      </div>

      <div>
        {showBudgetSettings ? 
          <BudgetSettings {...{ budget, setShowBudgetSettings }} /> : null
        }
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  expenditures: state.expenditures
});

export default connect(mapStateToProps, { selectBudget, chooseBudget })(Budget);
