import React from 'react';
import './dashboard/CreateBudget';
import CreateBudget from './dashboard/CreateBudget';
import Budgets from './dashboard/Budgets';
import Total from './dashboard/Total';
import allBudgets from '../db.json';
// import { fetchBudgets } from '../shared/fileUtils';

function Dashboard() {
  const budgets = allBudgets.budgets;

  return (
    <div>
      <CreateBudget />
      <Budgets budgets={budgets} />
      <Total budgets={budgets} />
    </div>
  )
}

export default Dashboard;