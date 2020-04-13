import React from 'react';
import './dashboard/CreateBudget';
import CreateBudget from './dashboard/CreateBudget';
import Budgets from './dashboard/Budgets';
import Total from './dashboard/Total';
import allBudgets from '../db.json';
// import { fetchBudgets } from '../shared/fileUtils';

function Dashboard() {
  return (
    <div>
      <CreateBudget />
      <Budgets allBudgets={allBudgets} />
      <Total />
    </div>
  )
}

export default Dashboard;