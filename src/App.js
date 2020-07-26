import React, { useState } from 'react';
import './App.css';
import './components/Dashboard';
import Dashboard from './components/Dashboard';
import Budget from './components/Budget';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import budgetReducer from './reducers/budget_reducer';

const store = createStore(
  budgetReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


function App() {
  const [budget, selectBudget] = useState({});

  return (
    <Provider store={store}>
    <div className="App">
      <Dashboard selectBudget={selectBudget} />
      <Budget budget={budget} />
    </div>
    </Provider>
  );
}

export default App;
