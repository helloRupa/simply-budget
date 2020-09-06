import React from 'react';
import { handleChangeWithRegex } from '../utils/formMethods';

function TextInputWithRegex({ placeholder = "", value, expr, callback }) {
  return <input 
    type="text" 
    placeholder={placeholder}
    value={value}
    onChange={e => handleChangeWithRegex(e, expr, callback)}
  />
}

export default TextInputWithRegex;
