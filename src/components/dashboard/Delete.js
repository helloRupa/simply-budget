import React from 'react';
import { destroyBudget } from '../../actions/budget_actions';
import { connect } from 'react-redux';

function Delete({ budget, setRemove, destroyBudget }) {
  const close = () => {
    setRemove(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    destroyBudget(budget.id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Delete {budget.name}?</h2>
      <input type="submit" value="Yes"/>
      <button onClick={close}>No</button>
    </form>
  )
}

export default connect(null, { destroyBudget })(Delete);