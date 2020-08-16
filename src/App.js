import React, { useState } from 'react';
import './App.css';
import './components/Dashboard';
import Dashboard from './components/Dashboard';
import Budget from './components/Budget';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import budgetReducer from './reducers/budget_reducer';
import expenditureReducer from './reducers/expenditure_reducer';
import settingsReducer from './reducers/settings_reducer';

const store = createStore(
  combineReducers({
    budget: budgetReducer,
    expenditures: expenditureReducer,
    settings: settingsReducer
  }),
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

function App() {
  const [showBudget, setShowBudget] = useState(false);

  return (
    <Provider store={store}>
    <div className="App">
      <Dashboard setShowBudget={setShowBudget} />
      { showBudget ? <Budget setShowBudget={setShowBudget} /> : null}
    </div>
    </Provider>
  );
}

export default App;
