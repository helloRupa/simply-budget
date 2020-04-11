import React from 'react';
import './dashboard/CreateBudget';
import CreateBudget from './dashboard/CreateBudget';
import Budgets from './dashboard/Budgets';
import Total from './dashboard/Total';

function Dashboard() {
  return (
    <div>
      <CreateBudget />
      <Budgets />
      <Total />
    </div>
  )
}

export default Dashboard;