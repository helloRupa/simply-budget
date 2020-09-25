import React from 'react';
import { connect } from 'react-redux';
import SubmitButton from '../shared/SubmitButton';
import Form from '../shared/Form';
import NoButton from '../shared/NoButton';

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
        <span>
          Are you sure you want to delete {name}?
        </span>
        
        <SubmitButton value="Yes" />

        <NoButton callback={close} />
      </Form>
    )
  }

  return connect(null, { deleteMethod })(Delete);
}

export default DeleteWrapper;
