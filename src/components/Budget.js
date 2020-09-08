import React, { useState, useEffect } from 'react';
import AddExpenditure from './budget/AddExpenditure';
import Expenditures from './budget/Expenditures';
import { formatNumber } from '../utils/format';
import { connect } from 'react-redux';
import { formattedSingleBudgetTracking } from '../utils/calculate';
import Close from '../shared/Close';
import { 
  selectBudgetExpenditures, 
  earliestPeriod 
} from '../utils/selectors';
import { chooseDashboard } from '../actions/ui_actions';
import ChartsContainer from './budget/ChartsContainer';

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
    if (currentPeriod - periods < lowestPeriod) {
      setPeriods(periods - 1);
    }
  }, [lowestPeriod, currentPeriod, periods]);

  const handleChartButton = e => {
    setShowChart(true);
  };

  return (
    <div>
      <h2>
        { name }
      </h2>
      <p>
        { startDate }
      </p>
      <Close callback={chooseDashboard} display={'Close'} />
      <button onClick={handleChartButton}>Show Charts</button>
      <p>
        Spend { currency }{ formatNumber(limit) } per { frequency } or less!
      </p>
      <p>
        Tracking (lifetime): { currency }
          {formattedSingleBudgetTracking(expenditures, budget)}
      </p>

      <Expenditures 
        {...{ expenditures, currentPeriod, currency, periods, budget }}
      />
      <button onClick={incrementPeriods} disabled={!showMore}>
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
  )
}

const mapStateToProps = state => ({
  budget: state.budget.selected,
  expenditures: state.expenditures
});

export default connect(mapStateToProps, { chooseDashboard })(Budget);