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
import errorReducer from './reducers/error_reducer';
import Error from './Error';
import archiveReducer from './reducers/archive_reducer';
import Archive from './components/Archive';
import uiReducer from './reducers/ui_reducer';

const store = createStore(
  combineReducers({
    budget: budgetReducer,
    expenditures: expenditureReducer,
    settings: settingsReducer,
    errors: errorReducer,
    archive: archiveReducer,
    currentView: uiReducer
  }),
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

function App() {
  const [showBudget, setShowBudget] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  return (
    <Provider store={store}>
    <div className="App">
      <Dashboard {...{ setShowBudget, forceUpdate, setShowArchive }} />
      {showBudget ? <Budget setShowBudget={setShowBudget} /> : null}
      {showArchive ? <Archive setShowArchive={setShowArchive} /> : null}
      <Error {...{ setForceUpdate, forceUpdate }} />
    </div>
    </Provider>
  );
}

export default App;
