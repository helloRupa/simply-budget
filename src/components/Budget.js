import React, { useState, useEffect } from 'react';
import AddExpenditure from './budget/AddExpenditure';
import Expenditures from './budget/Expenditures';
import { formatNumber, displayDate } from '../utils/format';
import { connect } from 'react-redux';
import { formattedSingleBudgetTracking, calculateTracking } from '../utils/calculate';
import BackButton from '../shared/BackButton';
import { 
  selectBudgetExpenditures, 
  earliestPeriod 
} from '../utils/selectors';
import { chooseDashboard } from '../actions/ui_actions';
import ChartsContainer from './budget/ChartsContainer';
import { setTrackingClassName } from '../utils/classNameSelectors';

function Budget({ 
  budget, 
  budget: { id, name, currency, limit, frequency, currentPeriod, startDate },
  expenditures,
  chooseDashboard
}) {
  const [periods, setPeriods] = useState(0);
  const [showMore, setShowMore] = useState(true);
  const [isTruncating, setIsTruncating] = useState(false);
  const [showChart, setShowChart] = useState(false);

  const trackingClassName = setTrackingClassName(calculateTracking({ expenditures, budget }));

  const budgetExpenditures = selectBudgetExpenditures(expenditures, budget);

  const lowestPeriod = budgetExpenditures && budgetExpenditures.length > 0 ? 
    earliestPeriod(budgetExpenditures) :
    currentPeriod;

  // only increment if there are more periods to show
  const incrementPeriods = () => {
    if ((periods < currentPeriod - 1) && 
      (currentPeriod - periods > lowestPeriod)) {
      setPeriods(periods + 1);
      setShowMore(true);
    } else {
      setShowMore(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (currentPeriod - periods < lowestPeriod) {
      setPeriods(periods - 1);
    }
  }, [lowestPeriod, currentPeriod, periods]);

  const handleChartButton = e => {
    setShowChart(true);
  };

  return (
    <>
    <div className="banner">
      <BackButton callback={chooseDashboard} />
      <button onClick={handleChartButton} className="charts-btn">Charts</button>

      <h2>{ name }</h2>
    </div>

    <div className="single-budget">
      <div className="budget-details">
        <span className="goal">
          <span>Goal</span> 
          <span>{ currency }{ formatNumber(limit) }</span> 
          <span>per { frequency }</span>
        </span>

        <span className="total-tracking">
          <span>Total Saved</span>
          <span className={trackingClassName}>
            {currency}{formattedSingleBudgetTracking(expenditures, budget)}
          </span>
          <span>since { displayDate(startDate) }</span>
        </span>
      </div>

      <Expenditures 
        {...{ expenditures, currentPeriod, currency, periods, budget }}
      />
      <button onClick={incrementPeriods} disabled={!showMore} className="load-more">
        Load More
      </button>
      { isTruncating ? <p><strong>Truncating oldest expenses</strong></p> : null }
      <AddExpenditure 
        expenditures={ expenditures[id] || [] } 
        setIsTruncating={setIsTruncating} 
      />

      {showChart ? 
        <ChartsContainer 
          budget={budget} 
          expenditures={expenditures} 
          close={() => setShowChart(false)} /> 
        : null}
    </div>
    </>
  )
}

const mapStateToProps = state => ({
  budget: state.budget.selected,
  expenditures: state.expenditures
});

export default connect(mapStateToProps, { chooseDashboard })(Budget);