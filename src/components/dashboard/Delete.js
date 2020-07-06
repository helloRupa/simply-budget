import React from 'react';
import { deleteBudget } from '../../shared/fileUtils';

function Delete({ budget, setRemove, removeBudget }) {
  const close = () => {
    setRemove(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    deleteBudget(budget.id)
      .then(() => removeBudget(budget.id));
    close();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Delete {budget.name}?</h2>
      <input type="submit" value="Yes"/>
      <button onClick={close}>No</button>
    </form>
  )
}

export default Delete;