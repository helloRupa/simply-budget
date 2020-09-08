import React from 'react';
import SpendLineChart from './SpendLineChart';
import { periodsToChart } from '../../constants/general';
import CategoryPieChart from './CategoryPieChart';
import Close from '../../shared/Close';

function ChartsContainer({ 
  budget,
  budget: { name, frequency }, 
  expenditures,
  close
}) {
  return <div>
    <h2>{name}</h2>

    <Close callback={close} display="Close" />

    <label>
      Spending per {frequency}, up to last {periodsToChart} periods
      <SpendLineChart {...{ budget, expenditures}} />
    </label>

    <label>
      Spending per category
      <CategoryPieChart {...{ budget, expenditures}} />
    </label>
  </div>
}

export default ChartsContainer;
