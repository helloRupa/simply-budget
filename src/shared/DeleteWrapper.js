import React from 'react';
import { connect } from 'react-redux';
import SubmitButton from '../shared/SubmitButton';
import Form from '../shared/Form';
import Close from '../shared/Close';

function DeleteWrapper(deleteMethod) {
  function Delete({ deletable, name, setRemove, deleteMethod }) {
    const close = () => {
      setRemove(false);
    };
  
    const handleSubmit = e => {
      deleteMethod(deletable);
    };
  
    return (
      <Form callback={handleSubmit}>
        <h2>Delete {name}?</h2>
        
        <SubmitButton value="Yes" />

        <Close callback={close} display="No" />
      </Form>
    )
  }

  return connect(null, { deleteMethod })(Delete);
}

export default DeleteWrapper;
