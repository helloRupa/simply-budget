import React from 'react';
import Item from './Item';

function Period({ title, expenditures, currency }) {

  return (
    <div>
      <h3>{ title }</h3>
      <ul>
        { expenditures.map(item => <li><Item item={item} currency={currency} /></li>) }
      </ul>
    </div>
  )
}

export default Period;