import React, { useState } from 'react';
import EditItem from './EditItem';
import { deleteExpenditure, getBudgetExpenditures } from '../../utils/comms';
import { formatNumber } from '../../utils/format';

function Item({ item, item: { id, date, title, amount, budgetId }, currency, setExpenditures }) {
  const [showEdit, setShowEdit] = useState(false);

  const handleEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleDelete = () => {
    deleteExpenditure(id)
      .then(() => {
        getBudgetExpenditures(budgetId)
          .then(setExpenditures);
      });
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
        /> : '' }
    </>
  );
}

export default Item;
