import React from 'react';
import { handleChange } from '../utils/formMethods';

function Select({ callback, value, optionsCallback }) {
  return <select onChange={e => handleChange(e, callback)} value={value}>
    {optionsCallback()}
  </select>
}

export default Select;
