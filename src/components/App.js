import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Budget from './Budget';
import Error from './Error';
import Archive from './Archive';
import Settings from './Settings';
import { connect } from 'react-redux';
import Header from './Header';

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
      {/* <Header /> */}
      {chooseView()}
      <Error {...{ setForceUpdate, forceUpdate }} />
    </div>
  );
}

const mapStateToProps = state => ({
  currentView: state.currentView
});

export default connect(mapStateToProps)(App);
