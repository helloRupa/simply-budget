import React, { useState } from 'react';
import Rename from './Rename';
import Delete from './Delete';

/** DELETING A BUDGET DELETES ALL DEPENDENT RECORDS **/
/** THIS IS DEFAULT BEHAVIOR WITH JSON-SERVER BUT NOT **/
/** FOR OTHER FORMS OF DATA STORAGE **/

function BudgetMenu({ budget, setShowMenu }) {
  const [rename, setRename] = useState(false);
  const [remove, setRemove] = useState(false);

  return (
    <div>
      <ul>
        <li><button onClick={() => setRename(true)}>Rename</button></li>
        <li><button onClick={() => setRemove(true)}>Delete</button></li>
      </ul>

      {rename ? <Rename {...{ budget, setShowMenu }} /> : null}
      {remove ? <Delete {...{ budget, setRemove }} /> : null}
    </div>
  )
}

export default BudgetMenu;