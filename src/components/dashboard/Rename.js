import React, { useState } from 'react';
import { handleChange } from '../../shared/handlers';
import { updateBudget } from '../../shared/fileUtils';

function Rename({ budget, setRename }) {
  const [name, setName] = useState(budget.name);

  const close = () => {
    setRename(false);
  }

  const updateName = e => {
    e.preventDefault();

    if (name.length > 1) {
      updateBudget(budget.id, { name });
      close();
    }
  }

  return (
    <form>
      <h2>Rename {budget.name}</h2>
      <input 
        type="text" 
        placeholder={budget.name}
        onChange={e => handleChange(e, setName)}
        value={name} />
      <button onClick={updateName}>Update</button>
      <button onClick={close}>Cancel</button>
    </form>
  )
}

export default Rename;