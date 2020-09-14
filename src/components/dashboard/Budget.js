import React, { useState, useEffect } from 'react';
import BudgetSettings from './BudgetSettings';
import { selectBudget } from '../../actions/budget_actions';
import { connect } from 'react-redux';
import { formattedSingleBudgetTracking, calculateTracking } from '../../utils/calculate';
import { chooseBudget } from '../../actions/ui_actions';
import { displayDate } from '../../utils/format';
import ClickOrHold from '../../shared/ClickOrHold';

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

  const clickCallback = () => {
    if (currentPeriod > 0) {
      selectBudget(budget);
      chooseBudget();
    }
  };

  const holdCallback = () => {
    setShowBudgetSettings(true);
  };

  return (
    <>
      <div className="budget-menu-item">
          <ClickOrHold clickCallback={clickCallback} holdCallback={holdCallback}  >
          <div className={`budget-menu-item-details ${startedClassName}`}>
            <span className="budget-name">{name}</span>
            <span className={`budget-tracking ${trackingClassName}`}>
              {currency}{formattedSingleBudgetTracking(expenditures, budget)}
            </span>
          </div>
          </ClickOrHold>

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
