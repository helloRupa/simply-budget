import React, { useState } from 'react';
import { handleChange } from '../../shared/handlers';
import { updateBudget } from '../../shared/fileUtils';

function Rename({ budget, setRename, setBudgetName }) {
  const [name, setName] = useState(budget.name);

  const close = () => {
    setRename(false);
  }

  const updateName = e => {
    e.preventDefault();

    if (name.length > 1) {
      updateBudget(budget.id, { name })
        .then(budget => setBudgetName(budget.name));
      close();
    }
  }

  return (
    <form onSubmit={updateName}>
      <h2>Rename {budget.name}</h2>
      <input 
        type="text" 
        placeholder={budget.name}
        onChange={e => handleChange(e, setName)}
        value={name} />
      <input type="submit" value="Update" />
      <button onClick={close}>Cancel</button>
    </form>
  )
}

export default Rename;