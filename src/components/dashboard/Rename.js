import React, { useState } from 'react';
import FormHOC from '../../shared/FormHOC';
import { patchBudget } from '../../actions/budget_actions';
import { connect } from 'react-redux';
import Error from '../../shared/Error';

function Rename({ budget, setShowMenu, patchBudget, handleChange }) {
  const [name, setName] = useState(budget.name);

  const close = () => {
    setShowMenu(false);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (name.length > 1) {
      patchBudget(budget.id, { name });
      close();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Rename {budget.name}</h2>
      <input 
        type="text" 
        placeholder={budget.name}
        onChange={e => handleChange(e, setName)}
        value={name} />
      <input type="submit" value="Update" />
      <button onClick={close}>Cancel</button>
      <Error msg="Budget name is required" condition={!name} />
    </form>
  )
}

export default connect(null, { patchBudget })(FormHOC(Rename));