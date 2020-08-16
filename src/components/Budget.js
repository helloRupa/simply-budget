import React, { useState } from 'react';
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

function Budget({ 
  budget, 
  budget: { id, name, currency, limit, frequency, currentPeriod },
  expenditures,
  setShowBudget
}) {
  const [periods, setPeriods] = useState(0);
  const [showMore, setShowMore] = useState(true);

  const budgetExpenditures = selectBudgetExpenditures(expenditures, budget);

  const lowestPeriod = budgetExpenditures ? 
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
  }

  return (
    <div>
      <h2>
        { name }
      </h2>
      <Close callback={() => setShowBudget(false)} display={'Close'} />
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
      <AddExpenditure expenditures={ expenditures[id] || [] } />
    </div>
  )
}

const mapStateToProps = state => ({
  budget: state.budget.selected,
  expenditures: state.expenditures
});

export default connect(mapStateToProps)(Budget);