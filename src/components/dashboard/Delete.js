import React from 'react';
import { deleteBudget } from '../../shared/fileUtils';

function Delete({ budget, setRemove }) {
  const close = () => {
    setRemove(false);
  };

  const removeBudget = e => {
    e.preventDefault();
    deleteBudget(budget.id);
    close();
  };

  return (
    <form>
      <h2>Delete {budget.name}?</h2>
      <button onClick={removeBudget}>Yes</button>
      <button onClick={close}>No</button>
    </form>
  )
}

export default Delete;