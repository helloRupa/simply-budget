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

  const [timeDown, setTimeDown] = useState(0);
  const [pressState, setPressState] = useState('');

  const startTimer = () => setTimeDown(Date.now());
  const setClickType = () => {
    Date.now() - timeDown < 500 ? setPressState('click') : setPressState('hold');
  };

  useEffect(() => {
    if (currentPeriod <= 0) {
      setStartedClassName('not-started');
    }

    if (calculateTracking({ expenditures, budget }) < 0) {
      setTrackingClassName('negative-tracking');
    }
  }, [currentPeriod, budget, expenditures]);

  const handleClick = () => {
    if (pressState === 'click' && currentPeriod > 0) {
      selectBudget(budget);
      chooseBudget();
    }

    if (pressState === 'hold') {
      setShowBudgetSettings(true);
    }
  };

  return (
    <>
      <div className="budget-menu-item">
        <div className="flex-horizontal">
          <div 
            onClick={handleClick} 
            className={`budget-menu-item-details ${startedClassName}`}
            onMouseDown={startTimer}
            onMouseUp={setClickType}>
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
