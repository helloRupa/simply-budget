import React, { useState } from 'react';
import Rename from './Rename';
import Delete from './Delete';

function BudgetMenu({ budget, setShowMenu }) {
  const [rename, setRename] = useState(false);
  const [remove, setRemove] = useState(false);

  return (
    <div>
      <ul>
        <li><button onClick={() => setRename(true)}>Rename</button></li>
        <li><button onClick={() => setRemove(true)}>Delete</button></li>
      </ul>

      { rename ? <Rename budget={budget} setShowMenu={setShowMenu} /> : ''}
      { remove ? <Delete budget={budget} setRemove={setRemove} /> : '' }
    </div>
  )
}

export default BudgetMenu;