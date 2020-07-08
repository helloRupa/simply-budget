import React, { useState, useEffect } from 'react';
import './dashboard/CreateBudget';
import CreateBudget from './dashboard/CreateBudget';
import Budgets from './dashboard/Budgets';
import Total from './dashboard/Total';
import { getBudgets } from '../utils/comms';
import Settings from './dashboard/Settings';

function Dashboard() {
  const [budgets, setBudgets] = useState([]);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    getBudgets().then(setBudgets);
  }, []);

  const removeBudget = id => {
    setBudgets(budgets.filter(budget => budget.id !== id));
  };

  const handleShowSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  const updateSettingsButton = () => (showSettings) ? 'Close Settings' : 'Show Settings';

  const displaySettings = () => (showSettings) ? <Settings /> : '';

  return (
    <div>
      <CreateBudget setBudgets={setBudgets} />
      <Budgets budgets={budgets} removeBudget={removeBudget} />
      <Total budgets={budgets} />
      {displaySettings()}
      <button onClick={handleShowSettingsClick}>{updateSettingsButton()}</button>
    </div>
  )
}

export default Dashboard;