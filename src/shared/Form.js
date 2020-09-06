import React from 'react';

function Form(props) {
  const handleSubmit = e => {
    e.preventDefault();
    props.callback(e);
  };

  return <form onSubmit={handleSubmit}>
    {props.children}
  </form>
}

export default Form;
