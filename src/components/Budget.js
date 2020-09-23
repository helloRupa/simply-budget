import React, { useState, useEffect } from 'react';
import '../styles/budget.css';
import '../styles/expenditure.css';
import AddExpenditure from './budget/AddExpenditure';
import Expenditures from './budget/Expenditures';
import { formatNumber, displayDate } from '../utils/format';
import { connect } from 'react-redux';
import { formattedSingleBudgetTracking, calculateTracking } from '../utils/calculate';
import BackButton from '../shared/BackButton';
import Button from '../shared/Button';
import { 
  selectBudgetExpenditures, 
  earliestPeriod 
} from '../utils/selectors';
import { chooseDashboard } from '../actions/ui_actions';
import ChartsContainer from './budget/ChartsContainer';
import { setTrackingClassName } from '../utils/classNameSelectors';
import ScrollToTop from '../shared/ScrollToTop';
import graph from '../images/graph.svg';
import useJumpToTop from '../hooks/useJumpToTop';

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

  useJumpToTop();

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

      <Button
        callback={handleChartButton}
        className="charts-btn"
        display={<img src={graph} alt="Charts" />} />

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

      <Button 
        callback={incrementPeriods} 
        disabled={!showMore} 
        className="load-more" 
        id="load-more"
        display="Load More" />

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

    <ScrollToTop />
    </>
  )
}

const mapStateToProps = state => ({
  budget: state.budget.selected,
  expenditures: state.expenditures
});

export default connect(mapStateToProps, { chooseDashboard })(Budget);