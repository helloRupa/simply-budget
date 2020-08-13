import React from 'react';

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
    
    const handleAmountChange = (e, callback) => {
      handleChangeWithRegex(e, /^\d+(\.\d?\d?)?$/, callback);
    };

    return <FormComponent 
      {...props} 
      {...{ handleChange, handleAmountChange, handleChangeWithRegex }}
    />
  }
}

export default Form;
