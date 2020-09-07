import React, { useRef, useState } from 'react';
import { dbKeys } from '../../constants/general';
import Error from '../../shared/Error';
import ImportConfirm from './ImportConfirm';

function ImportData() {
  const [importedData, setImportedData] = useState({});
  const [error, setError] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const filePicker = useRef(null);

  // useEffect(() => {
    // const validateData = json => {
    //   for (let i = 0; i < dbKeys.length; ++i) {
    //     const key = dbKeys[i];

    //     if (!json[key]) {
    //       return false;
    //     }
    //   }

    //   return true;
    // };

    // const updateAll = () => {
    //   return patchSettings(importedData.settings[0])
    //   .then(_ => fetchSettings())
    //   .then(_ => repostArchive(importedData.archives).then(_ => fetchArchives()))
    //   .then(_ => repostBudgets(importedData.budgets).then(_ => fetchBudgets()))
    //   .then(_ => repostExpenditures(importedData.expenditures).then(_ => fetchExpenditures()));
    // };

    // if (Object.keys(importedData).length) {
    //   if (validateData(importedData)) {
    //     setError(false);
    //     setShowConfirm(true);

        // dropAllData()
        // .then(_ => {
        //   updateAll()
        //   .then(_ => {
        //     setImportedData({});
        //     chooseDashboard();
        //   });
        // });
    //   } else {
    //     setError(true);
    //   }
    // }
    // eslint-disable-next-line 
  // }, [importedData]);

  const validateData = json => {
    if (!Object.keys(json).length) {
      return false;
    }

    for (let i = 0; i < dbKeys.length; ++i) {
      const key = dbKeys[i];

      if (!json[key]) {
        return false;
      }
    }

    return true;
  };

  const handleClick = e => {
    filePicker.current.value = '';
    filePicker.current.click();
  };

  const selectFile = () => filePicker.current.files[0];

  const handleFile = e => {
    const file = selectFile();

    file.text()
    .then(str => JSON.parse(str))
    .then(json => {
      setImportedData(json);

      if (validateData(json)) {
        setError(false);
        setShowConfirm(true);
      } else {
        setError(true);
      }
    });
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

    {showConfirm && !error ? 
      <ImportConfirm 
        file={selectFile()} 
        data={importedData} 
        close={() => setShowConfirm(false)} /> : null}
  </>
}

export default ImportData;
