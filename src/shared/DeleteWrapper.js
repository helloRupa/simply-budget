import React from 'react';
import { connect } from 'react-redux';

function DeleteWrapper(deleteMethod) {
  function Delete({ deletable, name, setRemove, deleteMethod }) {
    const close = () => {
      setRemove(false);
    };
  
    const handleSubmit = e => {
      e.preventDefault();
      deleteMethod(deletable);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2>Delete {name}?</h2>
        <input type="submit" value="Yes"/>
        <button onClick={close}>No</button>
      </form>
    )
  }

  return connect(null, { deleteMethod })(Delete);
}

export default DeleteWrapper;
