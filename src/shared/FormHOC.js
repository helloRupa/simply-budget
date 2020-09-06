import React from 'react';
import Error from './Error';

function Form(FormComponent) {
  return function({...props}) {
    const handleChange = (e, callback) => {
      callback(e.target.value);
    };
    
    const handleChangeWithRegex = (e, expr, callback) => {
      const regex = RegExp(expr);
      const value = e.target.value;
    
      if (regex.test(value) || !value) {
        handleChange(e, callback);
      }
    };

    return <FormComponent 
      {...props} 
      {...{ 
        handleChange, 
        handleChangeWithRegex,
        Error 
      }}
    />
  }
}

export default Form;
