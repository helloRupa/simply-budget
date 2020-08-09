import React from 'react';
import Period from './Period';

function Expenditures({ budget, expenditures, currentPeriod, currency, periods }) {
  return( 
  <section>
    <Period 
      title="Current Period" 
      budget={budget}
      expenditures={expenditures} 
      currency={currency}
      period={currentPeriod}
    />
    {/* <div>
      <h3>Current Period</h3>
      <ul>
        <li>10/20/2020: Food $30.66 <button>Edit</button></li>
        <li>10/18/2020: Clothes $18.66 <button>Edit</button></li>
      </ul>
    </div> */}

    <div>
      <h3>Older</h3>
      <ul>
        <li>10/15/2020: Food $52.56 <button>Edit</button></li>
        <li>10/12/2020: Electronics $180.99 <button>Edit</button></li>
      </ul>
      
    </div>
  </section>
  );
}

export default Expenditures;
