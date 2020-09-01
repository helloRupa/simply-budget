import React, { useEffect } from 'react';
import CreateBudget from './dashboard/CreateBudget';
import Budgets from './dashboard/Budgets';
import Totals from './dashboard/Totals';
import { updateBudgetsCurrentPeriods } from '../actions/budget_actions';
import { fetchExpenditures } from '../actions/expenditure_actions';
import { fetchArchives } from '../actions/archive_actions';
import { connect } from 'react-redux';
import { chooseSettings } from '../actions/ui_actions';

function Dashboard({ 
  budgets, 
  updateBudgetsCurrentPeriods, 
  fetchExpenditures,
  fetchArchives,
  expenditures, 
  setShowArchive,
  forceUpdate,
  chooseSettings
}) {
  useEffect(() => {
    updateBudgetsCurrentPeriods();
    fetchExpenditures();
    fetchArchives();
  }, [
    updateBudgetsCurrentPeriods, 
    fetchExpenditures, 
    forceUpdate, 
    fetchArchives
  ]);

  return (
    <div>
      <CreateBudget />
      <Budgets {...{ budgets }} />
      <Totals {...{ budgets, expenditures }} />

      <button onClick={() => chooseSettings()}>
        Show Settings
      </button>

      <button onClick={() => setShowArchive(true)}>
        Show Archive
      </button>
    </div>
  )
}

const mapStateToProps = state => ({
  budgets: state.budget.budgets,
  expenditures: state.expenditures,
  currentView: state.currentView
});

export default connect(mapStateToProps, { 
  updateBudgetsCurrentPeriods, 
  fetchExpenditures,
  fetchArchives,
  chooseSettings
})(Dashboard);
