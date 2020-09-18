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
  window.scrollTo(0, 0);
  
  return <div className="modal-background">
    <div className="modal">
    <Close callback={close} display="X" className="close" />

    <h2>{name}</h2>

    <div className="chart-container">
      <h4>Spending per {frequency}, up to last {periodsToChart} periods</h4>
      <SpendLineChart {...{ budget, expenditures}} />
    </div>

    <div className="chart-container">
      <h4>Spending per category</h4>
      <CategoryPieChart {...{ budget, expenditures}} />
    </div>
    </div>
  </div>
}

export default ChartsContainer;
