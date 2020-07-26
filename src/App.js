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

const store = createStore(
  combineReducers({
    budget: budgetReducer,
    expenditure: expenditureReducer
  }),
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

function App() {

  return (
    <Provider store={store}>
    <div className="App">
      <Dashboard />
      {/* <Budget budget={budget} /> */}
    </div>
    </Provider>
  );
}

export default App;
