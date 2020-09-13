import React, { useState, useEffect } from 'react';
import BudgetSettings from './BudgetSettings';
import { selectBudget } from '../../actions/budget_actions';
import { connect } from 'react-redux';
import { formattedSingleBudgetTracking, calculateTracking } from '../../utils/calculate';
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
  const [startedClassName, setStartedClassName] = useState('');
  const [trackingClassName, setTrackingClassName] = useState('');

  useEffect(() => {
    if (currentPeriod <= 0) {
      setStartedClassName('not-started');
    }

    if (calculateTracking({ expenditures, budget }) < 0) {
      setTrackingClassName('negative-tracking');
    }
  }, [currentPeriod, budget, expenditures]);

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
          <div onClick={handleClick} className={`budget-menu-item-details ${startedClassName}`}>
            <span className="budget-name">{name}</span>
            <span className={`budget-tracking ${trackingClassName}`}>
              {currency}{formattedSingleBudgetTracking(expenditures, budget)}
            </span>
          </div>
        </div>

        <p className={`start-date ${startedClassName}`}>Start Date: {displayDate(startDate)}</p>
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
