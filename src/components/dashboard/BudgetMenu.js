import React, { useState } from 'react';
import Rename from './Rename';

function BudgetMenu({ budget }) {
  const [rename, setRename] = useState(false);

  return (
    <div>
      <ul>
        <li><button onClick={() => setRename(true)}>Rename</button></li>
        <li><button>Delete</button></li>
      </ul>

      { rename ? <Rename budget={budget} setRename={setRename} /> : ''}
    </div>
  )
}

export default BudgetMenu;