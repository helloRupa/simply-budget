import React from 'react';
import { patchSettings, fetchSettings } from '../../actions/settings_actions';
import { repostArchive, repostBudgets, repostExpenditures, dropAllData } from '../../utils/comms';
import { fetchArchives } from '../../actions/archive_actions'
import { fetchBudgets } from '../../actions/budget_actions';
import { fetchExpenditures } from '../../actions/expenditure_actions';
import { chooseDashboard } from '../../actions/ui_actions';
import { connect } from 'react-redux';

function ImportConfirm({ 
  file, 
  data, 
  close, 
  patchSettings,
  fetchSettings,
  fetchArchives,
  fetchBudgets,
  fetchExpenditures,
  chooseDashboard
}) {
  const updateAll = () => {
    return patchSettings(data.settings[0])
    .then(_ => fetchSettings())
    .then(_ => repostArchive(data.archives).then(_ => fetchArchives()))
    .then(_ => repostBudgets(data.budgets).then(_ => fetchBudgets()))
    .then(_ => repostExpenditures(data.expenditures).then(_ => fetchExpenditures()));
  };

  const importFile = e => {
    dropAllData()
    .then(_ => {
      updateAll()
      .then(_ => chooseDashboard());
    });
  };

  return <div className="modal-background">
    <div className="modal">
    <h2>Are you sure you want to import <br/>{file.name}?</h2>
    <p>All of your data will be deleted before import.</p>
    <p>Only import files exported from this app!</p>

    <div className="special-buttons">
      <button onClick={importFile}>Yes! Import My Data</button>
      <button onClick={close}>No! Take Me Back</button>
    </div>
    
  </div>
  </div>
}

export default connect(null, {
  patchSettings,
  fetchSettings,
  fetchArchives,
  fetchBudgets,
  fetchExpenditures,
  chooseDashboard
})(ImportConfirm);