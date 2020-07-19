import React from 'react';

function Form() {
  const onSubmit = e => {
    e.preventDefault();
  };

  return <form onSubmit={onSubmit}>
    <input type="text" placeholder="Expenditure name (optional)"></input>
    <input type="text" placeholder="20.60"></input>
    <input type="submit" value="Save"></input>
  </form>
}

export default Form;