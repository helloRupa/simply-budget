import React from 'react';
import Period from './Period';

function Expenditures({ 
  budget, 
  expenditures, 
  currentPeriod, 
  currency, 
  periods 
}) {
  const makePeriods = () => {
    const components = [];

    for (let i = 1; i <= periods; i++) {
      components.push(
        <Period {...{ budget, expenditures, currency }}
          period={currentPeriod - i}
          key={`${budget.name}-${i}`}
        />
      );
    }

    return components;
  };

  return( 
  <section>
    <Period {...{ budget, expenditures, currency }}
      title="Current Period" 
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
