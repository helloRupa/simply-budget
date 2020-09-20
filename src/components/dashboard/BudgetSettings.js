import React, { useState } from 'react';
import UpdateBudget from './UpdateBudget';
import DeleteWrapper from '../../shared/DeleteWrapper';
import { destroyBudget } from '../../actions/budget_actions';
import Archive from './Archive';

/** DELETING A BUDGET DELETES ALL DEPENDENT RECORDS **/
/** THIS IS DEFAULT BEHAVIOR WITH JSON-SERVER BUT NOT **/
/** FOR OTHER FORMS OF DATA STORAGE **/

const Delete = DeleteWrapper(destroyBudget);

function BudgetSettings({ 
  setShowBudgetSettings, 
  budget,
  budget: { name, id }
}) {
  const [remove, setRemove] = useState(false);
  const [archive, setArchive] = useState(false);

  const close = () => setShowBudgetSettings(false);

  return <div className="modal-background">
    <div className="modal">
      <h2>Edit {name}</h2>
      
      <UpdateBudget {...{ budget, close }} />

      <div>
        <button onClick={() => setArchive(true)} className="archive-btn">
          Archive
        </button>
        {archive ? <Archive {...{ budget, setArchive }} /> : null}
        <button onClick={() => setRemove(true)} className="delete-btn">
          Delete
        </button>
        {remove ? <Delete deletable={id} {...{name, setRemove}} /> : null}
      </div>
    </div>
  </div>
}

export default BudgetSettings;
