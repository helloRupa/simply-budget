import React, { useState, useEffect } from 'react';
import './dashboard/CreateBudget';
import CreateBudget from './dashboard/CreateBudget';
import Budgets from './dashboard/Budgets';
import Total from './dashboard/Total';
// import { getBudgets } from '../utils/comms';
import { fetchBudgets } from '../actions/budget_actions';
import Settings from './dashboard/Settings';
import { connect } from 'react-redux';

// ADD ARCHIVING

function Dashboard({ selectBudget, budgets, fetchBudgets }) {
  const [budgetsss, setBudgets] = useState([]);
  const [showSettings, setShowSettings] = useState(false);

  // useEffect(() => {
  //   getBudgets().then(setBudgets);
  // }, []);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const removeBudget = id => {
    setBudgets(budgets.filter(budget => budget.id !== id));
  };

  const handleShowSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  const updateSettingsButton = () => (showSettings) ? 'Close Settings' : 'Show Settings';

  const displaySettings = () => (showSettings) ? <Settings setShowSettings={setShowSettings} /> : '';

  return (
    <div>
      {/* <CreateBudget setBudgets={setBudgets} />
      <Budgets budgets={budgets} removeBudget={removeBudget} selectBudget={selectBudget} />
      <Total budgets={budgets} />
      {displaySettings()}
      <button onClick={handleShowSettingsClick}>{updateSettingsButton()}</button> */}
    </div>
  )
}

// export default Dashboard;

const mapStateToProps = state => ({
  budgets: state.budgets
});

export default connect(mapStateToProps, { fetchBudgets })(Dashboard);