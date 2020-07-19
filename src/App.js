import React, { useState } from 'react';
import './App.css';
import './components/Dashboard';
import Dashboard from './components/Dashboard';
import Budget from './components/Budget';

function App() {
  const [budget, selectBudget] = useState(0);

  return (
    <div className="App">
      <Dashboard selectBudget={selectBudget} />
      <Budget budget={budget} />
    </div>
  );
}

export default App;
