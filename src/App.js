import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Budget from './components/Budget';
import Error from './Error';
import Archive from './components/Archive';
import Settings from './components/Settings';
import { connect } from 'react-redux';

function App({ currentView }) {
  const [showBudget, setShowBudget] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  const chooseView = () => {
    switch(currentView) {
      case 'SETTINGS':
        return <Settings />
      default:
        return <Dashboard {...{ setShowBudget, forceUpdate, setShowArchive }} />
    }
  };

  return (
    <div className="App">

      {chooseView()}
      {showBudget ? <Budget setShowBudget={setShowBudget} /> : null}
      {showArchive ? <Archive setShowArchive={setShowArchive} /> : null}
      <Error {...{ setForceUpdate, forceUpdate }} />
    </div>
  );
}

const mapStateToProps = state => ({
  currentView: state.currentView
});

export default connect(mapStateToProps)(App);
