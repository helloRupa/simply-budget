import React, { useState } from 'react';
import Close from '../../shared/Close';
import UpdateBudget from './UpdateBudget';
import Delete from './Delete';
import Archive from './Archive';

/** DELETING A BUDGET DELETES ALL DEPENDENT RECORDS **/
/** THIS IS DEFAULT BEHAVIOR WITH JSON-SERVER BUT NOT **/
/** FOR OTHER FORMS OF DATA STORAGE **/

function BudgetSettings({ 
  setShowBudgetSettings, 
  budget,
  budget: { name }
}) {
  const [remove, setRemove] = useState(false);
  const [archive, setArchive] = useState(false);

  const close = () => setShowBudgetSettings(false);

  return (
    <div>
      <h2>Edit {name}</h2>

      <Close callback={close} display='Close' />
      <UpdateBudget {...{ budget, close }} />

      <button onClick={() => setArchive(true)}>Archive</button>
      <button onClick={() => setRemove(true)}>Delete</button>
      {remove ? <Delete {...{ budget, setRemove }} /> : null}
      {archive ? <Archive {...{ budget, setArchive }} /> : null}
    </div>
  )
}

export default BudgetSettings;
