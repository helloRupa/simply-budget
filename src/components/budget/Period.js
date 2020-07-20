import React from 'react';
import Item from './Item';

function Period({ title, expenditures, currency, setExpenditures }) {

  return (
    <div>
      <h3>{ title }</h3>
      <ul>
        { expenditures.map(item => 
          <li>
            <Item 
              item={item} 
              currency={currency} 
              setExpenditures={setExpenditures} 
            />
          </li>
        ) }
      </ul>
    </div>
  )
}

export default Period;