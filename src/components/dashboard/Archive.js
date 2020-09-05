import React from 'react';
import { connect } from 'react-redux';
import { archiveBudget } from '../../actions/archive_actions';
import SubmitButton from '../../shared/SubmitButton';

function Archive({ budget, archiveBudget, expenditures, setArchive }) {
  const close = () => {
    setArchive(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    archiveBudget(budget, expenditures);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Archive {budget.name}?</h2>

      <SubmitButton value="Yes" />
      
      <button onClick={close}>No</button>
    </form>
  );
}

const mapStateToProps = state => ({
  expenditures: state.expenditures
});

export default connect(mapStateToProps, { archiveBudget })(Archive);
