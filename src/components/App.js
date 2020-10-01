import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Budget from './Budget';
import Error from './Error';
import Archive from './Archive';
import Settings from './Settings';
import { connect } from 'react-redux';
import '../styles/colors-darkmode.css';
import Tooltip from './Tooltip';
import useDidMount from '../hooks/useDidMount';
import AppLoad from './AppLoad';

function App({ currentView, darkMode }) {
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

  const toggleDarkMode = darkMode ? 'dark-mode' : '';

  return (
    <>
    <AppLoad firstMount={useDidMount().current} />
    <main className={toggleDarkMode}>
      <div className="wrapper">
        {chooseView()}
        <Tooltip />
        <Error {...{ setForceUpdate, forceUpdate }} />
      </div>
    </main>
    </>
  );
}

const mapStateToProps = state => ({
  currentView: state.currentView,
  darkMode: state.settings['dark-mode']
});

export default connect(mapStateToProps)(App);
