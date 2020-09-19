import React from 'react';
import { connect } from 'react-redux';
import SubmitButton from '../shared/SubmitButton';
import Form from '../shared/Form';
import Button from '../shared/Button';

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
      <Form callback={handleSubmit} className={"confirm"}>
        Are you sure you want to delete {name}?
        
        <SubmitButton value="Yes" />

        <Button callback={close} display="No" />
      </Form>
    )
  }

  return connect(null, { deleteMethod })(Delete);
}

export default DeleteWrapper;
