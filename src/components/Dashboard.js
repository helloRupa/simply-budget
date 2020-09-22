import React, { useEffect } from 'react';
import '../styles/dashboard.css';
import CreateBudget from './dashboard/CreateBudget';
import Budgets from './dashboard/Budgets';
import { updateBudgetsCurrentPeriods } from '../actions/budget_actions';
import { fetchExpenditures } from '../actions/expenditure_actions';
import { connect } from 'react-redux';
import { chooseSettings, chooseArchive } from '../actions/ui_actions';
import { fetchSettings } from '../actions/settings_actions';
import ScrollToTop from '../shared/ScrollToTop';
import clock from '../images/clock.svg';
import cog from '../images/cog.svg';
import useJumpToTop from '../effects/useJumpToTop';
import Button from '../shared/Button';

function Dashboard({ 
  budgets, 
  updateBudgetsCurrentPeriods, 
  fetchExpenditures,
  expenditures, 
  forceUpdate,
  chooseSettings,
  chooseArchive,
  fetchSettings
}) {
  useEffect(() => {
    updateBudgetsCurrentPeriods();
    fetchExpenditures();
    fetchSettings();
  }, [
    updateBudgetsCurrentPeriods, 
    fetchExpenditures, 
    forceUpdate,
    fetchSettings
  ]);

  useJumpToTop();

  return (
    <div>
      <CreateBudget />
      <Budgets {...{ budgets, expenditures }} />

      <div className="dash-buttons">
        <Button 
          callback={chooseSettings} 
          display={<img src={cog} alt="Settings" />} />

        <Button 
          callback={chooseArchive}
          display={<img src={clock} alt="Archive" />} />
      </div>

      <ScrollToTop />
    </div>
  )
}

const mapStateToProps = state => ({
  budgets: state.budget.budgets,
  expenditures: state.expenditures
});

export default connect(mapStateToProps, { 
  updateBudgetsCurrentPeriods, 
  fetchExpenditures,
  fetchSettings,
  chooseSettings,
  chooseArchive
})(Dashboard);
