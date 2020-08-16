import React, { useState } from 'react';
import FormHOC from '../../shared/FormHOC';
import { patchBudget } from '../../actions/budget_actions';
import { connect } from 'react-redux';

function Rename({ 
  budget, 
  close,
  patchBudget, 
  handleChange, 
  Error 
}) {
  const [name, setName] = useState(budget.name);

  const handleSubmit = e => {
    e.preventDefault();

    if (name.length > 1) {
      patchBudget(budget.id, { name });
      close();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder={budget.name}
        onChange={e => handleChange(e, setName)}
        value={name} />
      <input type="submit" value="Update" />

      <Error msg="Budget name is required" condition={!name} />
    </form>
  )
}

export default connect(null, { patchBudget })(FormHOC(Rename));