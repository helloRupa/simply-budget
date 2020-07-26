import React, { useState } from 'react';
import Rename from './Rename';
import Delete from './Delete';

function BudgetMenu({ budget, setBudgetName }) {
  const [rename, setRename] = useState(false);
  const [remove, setRemove] = useState(false);

  return (
    <div>
      <ul>
        <li><button onClick={() => setRename(true)}>Rename</button></li>
        <li><button onClick={() => setRemove(true)}>Delete</button></li>
      </ul>

      { rename ? <Rename budget={budget} setRename={setRename} setBudgetName={setBudgetName} /> : ''}
      { remove ? <Delete budget={budget} setRemove={setRemove} /> : '' }
    </div>
  )
}

export default BudgetMenu;