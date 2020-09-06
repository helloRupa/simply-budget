import React, { useRef, useState, useEffect } from 'react';
import { dbKeys } from '../../constants/general';
import { connect } from 'react-redux';
import { patchSettings, fetchSettings } from '../../actions/settings_actions';
import { repostArchive, repostBudgets, repostExpenditures, dropAllData } from '../../utils/comms';
import { fetchArchives } from '../../actions/archive_actions'
import { fetchBudgets } from '../../actions/budget_actions';
import { fetchExpenditures } from '../../actions/expenditure_actions';
import { chooseDashboard } from '../../actions/ui_actions';
import Error from '../../shared/Error';

function ImportData( {
  patchSettings,
  fetchSettings,
  fetchArchives,
  fetchBudgets,
  fetchExpenditures,
  chooseDashboard
}) {
  const [importedData, setImportedData] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const validateData = json => {
      for (let i = 0; i < dbKeys.length; ++i) {
        const key = dbKeys[i];

        if (!json[key]) {
          return false;
        }
      }

      return true;
    };

    const updateAll = () => {
      return patchSettings(importedData.settings[0])
      .then(_ => fetchSettings())
      .then(_ => repostArchive(importedData.archives).then(_ => fetchArchives()))
      .then(_ => repostBudgets(importedData.budgets).then(_ => fetchBudgets()))
      .then(_ => repostExpenditures(importedData.expenditures).then(_ => fetchExpenditures()));
    };

    if (Object.keys(importedData).length) {
      if (validateData(importedData)) {
        setError(false);

        dropAllData()
        .then(_ => {
          updateAll()
          .then(_ => {
            setImportedData({});
            chooseDashboard();
          });
        });
      } else {
        setError(true);
      }
    }
    // eslint-disable-next-line 
  }, [importedData]);

  const filePicker = useRef(null);

  const handleClick = e => {
    filePicker.current.click();
  };

  const handleFile = e => {
    const file = filePicker.current.files[0];

    file.text()
    .then(str => JSON.parse(str))
    .then(json => setImportedData(json));
  };

  return <>
    <button onClick={handleClick}>
      Import Data
    </button>
    <input 
      type="file" 
      accept=".json" 
      ref={filePicker} 
      onChange={handleFile}
      style={{display: "none"}} />

    <Error msg={"File chosen for import is invalid"} condition={error} />
  </>
}

export default connect(null, {
  patchSettings,
  fetchSettings,
  fetchArchives,
  fetchBudgets,
  fetchExpenditures,
  chooseDashboard
})(ImportData);
