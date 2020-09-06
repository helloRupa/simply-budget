import React from 'react';
import Error from './Error';

function Form(FormComponent) {
  return function({...props}) {
    return <FormComponent 
      {...props} 
      {...{ 
        Error 
      }}
    />
  }
}

export default Form;
