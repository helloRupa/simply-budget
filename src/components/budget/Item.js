import React, { useState } from 'react';
import EditItem from './EditItem';
import { formatNumber } from '../../utils/format';
import { connect } from 'react-redux';
import { destroyExpenditure } from '../../actions/expenditure_actions';

function Item({ 
  item, 
  item: { id, date, title, amount, budgetId }, 
  currency, 
  setExpenditures,
  destroyExpenditure
}) {
  const [showEdit, setShowEdit] = useState(false);

  const handleEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleDelete = () => {
    destroyExpenditure(item);
  };

  return (
    <>
      { date }: { title } { currency }{ formatNumber(amount) } <button onClick={handleEdit}>Edit</button> 
      <button onClick={handleDelete}>Delete</button>
      { (showEdit) ? 
        <EditItem 
          item={item} 
          currency={currency} 
          setShowEdit={setShowEdit} 
          setExpenditures={setExpenditures}
        /> : null }
    </>
  );
}

export default connect(null, { destroyExpenditure })(Item);
