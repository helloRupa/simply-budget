import React from 'react';
import { connect } from 'react-redux';
import { archiveBudget } from '../../actions/archive_actions';
import Form from '../../shared/Form';
import SubmitButton from '../../shared/SubmitButton';
import Close from '../../shared/Close';

function Archive({ budget, archiveBudget, expenditures, setArchive }) {
  const close = () => {
    setArchive(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    archiveBudget(budget, expenditures);
  };

  return (
    <Form callback={handleSubmit} className={"confirm"}>
      Are you sure you want to archive {budget.name}?

      <SubmitButton value="Yes" />

      <Close callback={close} display="No" />
    </Form>
  );
}

const mapStateToProps = state => ({
  expenditures: state.expenditures
});

export default connect(mapStateToProps, { archiveBudget })(Archive);
