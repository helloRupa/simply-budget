import React, { useState } from 'react';
import Form from './budget/Form';
import Expenditures from './budget/Expenditures';
import { formatNumber } from '../utils/format';
import { connect } from 'react-redux';
import { calculateTracking } from '../utils/calculate';

// add an expenditure
// show error messages for forms

function Budget({ 
  budget, 
  budget: { name, currency, limit, frequency, currentPeriod },
  expenditures,
  setShowBudget
}) {
  const [periods, setPeriods] = useState(0);
  const [showMore, setShowMore] = useState(true);

  const incrementPeriods = () => {
    if (periods < currentPeriod - 1) {
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
      <Form />
    </div>
  )
}

const mapStateToProps = state => ({
  budget: state.budget.selected,
  expenditures: state.expenditures
});

export default connect(mapStateToProps)(Budget);