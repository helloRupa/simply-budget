import React, { useState, useEffect } from 'react';
import './dashboard/CreateBudget';
import CreateBudget from './dashboard/CreateBudget';
import Budgets from './dashboard/Budgets';
import Totals from './dashboard/Totals';
import { fetchBudgets } from '../actions/budget_actions';
import { fetchSettings } from '../actions/settings_actions';
import { fetchExpenditures } from '../actions/expenditure_actions';
import Settings from './dashboard/Settings';
import { connect } from 'react-redux';

function Dashboard({ 
  budgets, 
  fetchBudgets, 
  fetchSettings, 
  fetchExpenditures,
  expenditures
}) {
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    fetchBudgets();
    fetchExpenditures();
    fetchSettings();
  }, [fetchBudgets, fetchSettings, fetchExpenditures]);

  const handleShowSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  const updateSettingsButton = () => 
    showSettings ? 'Close Settings' : 'Show Settings';

  const displaySettings = () => 
    showSettings ? <Settings setShowSettings={setShowSettings} /> : '';

  return (
    <div>
      <CreateBudget />
      <Budgets budgets={budgets} />
      <Totals budgets={budgets} expenditures={expenditures} />
      {displaySettings()}
      <button onClick={handleShowSettingsClick}>
        {updateSettingsButton()}
      </button>
    </div>
  )
}

const mapStateToProps = state => ({
  budgets: state.budget.budgets,
  expenditures: state.expenditures
});

export default connect(mapStateToProps, { 
  fetchBudgets, 
  fetchSettings, 
  fetchExpenditures 
})(Dashboard);