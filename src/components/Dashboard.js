import React, { useEffect } from 'react';
import CreateBudget from './dashboard/CreateBudget';
import Budgets from './dashboard/Budgets';
import { updateBudgetsCurrentPeriods } from '../actions/budget_actions';
import { fetchExpenditures } from '../actions/expenditure_actions';
import { connect } from 'react-redux';
import { chooseSettings, chooseArchive } from '../actions/ui_actions';
import { fetchSettings } from '../actions/settings_actions';

function Dashboard({ 
  budgets, 
  updateBudgetsCurrentPeriods, 
  fetchExpenditures,
  expenditures, 
  forceUpdate,
  chooseSettings,
  chooseArchive,
  fetchSettings
}) {
  useEffect(() => {
    updateBudgetsCurrentPeriods();
    fetchExpenditures();
    fetchSettings();
  }, [
    updateBudgetsCurrentPeriods, 
    fetchExpenditures, 
    forceUpdate,
    fetchSettings
  ]);

  window.scrollTo(0, 0);

  return (
    <div>
      <CreateBudget />
      <Budgets {...{ budgets, expenditures }} />

      <div className="dash-buttons">
        <button onClick={chooseSettings}>
          Settings
        </button>

        <button onClick={chooseArchive}>
          Archive
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  budgets: state.budget.budgets,
  expenditures: state.expenditures
});

export default connect(mapStateToProps, { 
  updateBudgetsCurrentPeriods, 
  fetchExpenditures,
  fetchSettings,
  chooseSettings,
  chooseArchive
})(Dashboard);
