import React from 'react';
import { saveAs } from 'file-saver';
import { fetchDb } from '../../utils/comms';

function ExportData() {
  const handleClick = e => {
    fetchDb().then(db => {
      const blob = new Blob([JSON.stringify(db)], { type: 'application/json' });

      saveAs(blob, 'simply-budget-db.json');
    });
  };

  return <button onClick={handleClick}>
    Export Data
  </button>
}

export default ExportData;
