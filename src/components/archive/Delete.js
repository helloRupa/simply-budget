import React from 'react';
import { destroyArchived } from '../../actions/archive_actions';
import { connect } from 'react-redux';

function Delete({ archived, setShowDelete, destroyArchived }) {
  const close = () => {
    setShowDelete(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    destroyArchived(archived);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Delete {archived.name}?</h2>
      <input type="submit" value="Yes"/>
      <button onClick={close}>No</button>
    </form>
  )
}

export default connect(null, { destroyArchived })(Delete);