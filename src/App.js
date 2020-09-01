import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Budget from './components/Budget';
import Error from './Error';
import Archive from './components/Archive';
import Settings from './components/Settings';
import { connect } from 'react-redux';

function App({ currentView }) {
  const [forceUpdate, setForceUpdate] = useState(0);

  const chooseView = () => {
    switch(currentView) {
      case 'SETTINGS':
        return <Settings />
      case 'BUDGET':
        return <Budget />
      case 'ARCHIVE':
        return <Archive />
      default:
        return <Dashboard {...{ forceUpdate }} />
    }
  };

  return (
    <div className="App">
      {chooseView()}
      <Error {...{ setForceUpdate, forceUpdate }} />
    </div>
  );
}

const mapStateToProps = state => ({
  currentView: state.currentView
});

export default connect(mapStateToProps)(App);
