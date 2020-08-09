import React, { useState } from 'react';
import Form from './budget/Form';
import Expenditures from './budget/Expenditures';
import { formatNumber } from '../utils/format';
import { connect } from 'react-redux';
import { calculateTracking } from '../utils/calculate';
// populate expenditures, handle empty expenditures
// show current and old expenditures
// show another period when clicking button
// add an expenditure

// show error messages for forms

function Budget({ 
  budget, 
  budget: { name, currency, limit, frequency, currentPeriod },
  expenditures,
  setShowBudget
}) {
  const [periods, setPeriods] = useState(1);

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
      <button onClick={() => setPeriods(periods + 1)}>Load More</button>
      <Form />
    </div>
  )
}

const mapStateToProps = state => ({
  budget: state.budget.selected,
  expenditures: state.expenditures
});

export default connect(mapStateToProps)(Budget);