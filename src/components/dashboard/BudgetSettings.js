import React, { useState } from 'react';
import Close from '../../shared/Close';
import Rename from './Rename';
import Delete from './Delete';

/** DELETING A BUDGET DELETES ALL DEPENDENT RECORDS **/
/** THIS IS DEFAULT BEHAVIOR WITH JSON-SERVER BUT NOT **/
/** FOR OTHER FORMS OF DATA STORAGE **/

function BudgetSettings({ 
  setShowBudgetSettings, 
  budget,
  budget: { name, startDate }
}) {
  const [remove, setRemove] = useState(false);

  const close = () => setShowBudgetSettings(false);

  return (
    <div>
      <h2>Edit {name}</h2>

      <Close callback={close} display='Close' />
      <Rename {...{ budget, close }} />

      <button onClick={() => setRemove(true)}>Delete</button>
      {remove ? <Delete {...{ budget, setRemove }} /> : null}
    </div>
  )
}

export default BudgetSettings;
