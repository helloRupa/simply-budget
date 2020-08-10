import React, { useState } from 'react';
import Form from './budget/Form';
import Expenditures from './budget/Expenditures';
import { formatNumber } from '../utils/format';
import { connect } from 'react-redux';
import { calculateTracking } from '../utils/calculate';

function Budget({ 
  budget, 
  budget: { id, name, currency, limit, frequency, currentPeriod },
  expenditures,
  setShowBudget
}) {
  const [periods, setPeriods] = useState(0);
  const [showMore, setShowMore] = useState(true);

  const budgetExpenditures = expenditures[budget.id];
  const lowestPeriod = budgetExpenditures ? 
    budgetExpenditures[0].period :
    currentPeriod;

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
      <button onClick={() => setShowBudget(false)}>
        Close
      </button>
      <p>
        Spend { currency }{ formatNumber(limit) } per { frequency } or less!
      </p>
      <p>
        Tracking (lifetime): { currency }
          { formatNumber(calculateTracking({expenditures, budget})) }
      </p>

      <Expenditures 
        expenditures={expenditures} 
        currentPeriod={currentPeriod} 
        currency={currency} 
        periods={periods}
        budget={budget}
      />
      <button onClick={incrementPeriods} disabled={!showMore}>
        Load More
      </button>
      <Form expenditures={expenditures[id] || []} />
    </div>
  )
}

const mapStateToProps = state => ({
  budget: state.budget.selected,
  expenditures: state.expenditures
});

export default connect(mapStateToProps)(Budget);