import React from 'react';
import Period from './Period';

function Expenditures({ budget, expenditures, currentPeriod, currency, periods }) {
  const makePeriods = () => {
    const components = [];

    for (let i = 1; i <= periods; i++) {
      components.push(
        <Period 
          budget={budget}
          expenditures={expenditures} 
          currency={currency}
          period={currentPeriod - i}
          key={`${budget.name}-${i}`}
        />
      );
    }

    return components;
  };

  return( 
  <section>
    <Period 
      title="Current Period" 
      budget={budget}
      expenditures={expenditures} 
      currency={currency}
      period={currentPeriod}
    />

    {
      (periods < 1) ? null : 
        <section>
          <h3>Older Expenses</h3>
          {makePeriods()}
        </section>
    }
    
  </section>
  );
}

export default Expenditures;
