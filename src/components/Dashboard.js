import React, { useState, useEffect } from 'react';
import CreateBudget from './dashboard/CreateBudget';
import Budgets from './dashboard/Budgets';
import Totals from './dashboard/Totals';
import { updateBudgetsCurrentPeriods } from '../actions/budget_actions';
import { fetchSettings } from '../actions/settings_actions';
import { fetchExpenditures } from '../actions/expenditure_actions';
import { fetchArchives } from '../actions/archive_actions';
import Settings from './dashboard/Settings';
import { connect } from 'react-redux';

function Dashboard({ 
  budgets, 
  updateBudgetsCurrentPeriods, 
  fetchSettings, 
  fetchExpenditures,
  fetchArchives,
  expenditures, 
  setShowBudget,
  setShowArchive,
  forceUpdate
}) {
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    updateBudgetsCurrentPeriods();
    fetchExpenditures();
    fetchSettings();
    fetchArchives();
  }, [
    updateBudgetsCurrentPeriods, 
    fetchSettings, 
    fetchExpenditures, 
    forceUpdate, 
    fetchArchives
  ]);

  const displaySettings = () => 
    showSettings ? <Settings {...{ setShowSettings }} /> : null;

  return (
    <div>
      <CreateBudget />
      <Budgets {...{ budgets, setShowBudget }} />
      <Totals {...{ budgets, expenditures }} />
      {displaySettings()}
      <button onClick={() => setShowSettings(true)}>
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
  expenditures: state.expenditures
});

export default connect(mapStateToProps, { 
  updateBudgetsCurrentPeriods, 
  fetchSettings, 
  fetchExpenditures,
  fetchArchives 
})(Dashboard);
