import React, { useState, useEffect } from 'react';
import './dashboard/CreateBudget';
import CreateBudget from './dashboard/CreateBudget';
import Budgets from './dashboard/Budgets';
import Total from './dashboard/Total';
import { getBudgets } from '../utils/comms';
import Settings from './dashboard/Settings';

function Dashboard() {
  const [budgets, setBudgets] = useState([]);

  const removeBudget = id => {
    setBudgets(budgets.filter(budget => budget.id !== id));
  };

  useEffect(() => {
    getBudgets().then(setBudgets);
  }, []);

  return (
    <div>
      <CreateBudget setBudgets={setBudgets} />
      <Budgets budgets={budgets} removeBudget={removeBudget} />
      <Total budgets={budgets} />
      <Settings />
    </div>
  )
}

export default Dashboard;