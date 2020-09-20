import React, { useEffect } from 'react';
import '../styles/dashboard.css';
import CreateBudget from './dashboard/CreateBudget';
import Budgets from './dashboard/Budgets';
import { updateBudgetsCurrentPeriods } from '../actions/budget_actions';
import { fetchExpenditures } from '../actions/expenditure_actions';
import { connect } from 'react-redux';
import { chooseSettings, chooseArchive } from '../actions/ui_actions';
import { fetchSettings } from '../actions/settings_actions';
import ScrollToTop from '../shared/ScrollToTop';

function Dashboard({ 
  budgets, 
  updateBudgetsCurrentPeriods, 
  fetchExpenditures,
  expenditures, 
  forceUpdate,
  chooseSettings,
  chooseArchive,
  fetchSettings,
  currentView
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

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

        <ScrollToTop />
      </div>
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
  fetchSettings,
  chooseSettings,
  chooseArchive
})(Dashboard);
