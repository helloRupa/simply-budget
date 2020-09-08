import React from 'react';
import SpendLineChart from './SpendLineChart';
import { periodsToChart } from '../../constants/general';
import { calculatePeriodSpent } from '../../utils/calculate';
import Close from '../../shared/Close';

// data={[
//   { period: 1, spent: 2 },
//   { period: 2, spent: 3 },
//   { period: 3, spent: 5 },
//   { period: 4, spent: 4 },
//   { period: 5, spent: 7 }
// ]}

function ChartsContainer({ 
  budget,
  budget: { name, currency, limit, currentPeriod, frequency }, 
  expenditures,
  close
}) {
  const totalPeriods = currentPeriod < periodsToChart ? currentPeriod : periodsToChart;

  let tickValues = Array(totalPeriods).fill(null);
  tickValues = tickValues.map((_, idx) => currentPeriod - idx);

  const data = tickValues.reduce((accum, period) => {
    accum.push({
      period,
      spent: calculatePeriodSpent({ expenditures, budget, period })
    });

    return accum;
  }, []);

  const domain = {x: [tickValues[tickValues.length - 1], tickValues[0]]};
  console.log(data);

  return <div>
    <h2>{name}</h2>

    <Close callback={close} display="Close" />

    <label>
      Spending Per {frequency}, up to last {periodsToChart} periods
      <SpendLineChart {...{ currency, limit, tickValues, data, domain }} />
    </label>
  </div>
}

export default ChartsContainer;
