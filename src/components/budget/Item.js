import React, { useState } from 'react';
import EditItem from './EditItem';
import { formatNumber, displayDate } from '../../utils/format';
import { connect } from 'react-redux';
import { destroyExpenditure } from '../../actions/expenditure_actions';

function Item({ 
  item, 
  item: { date, title, amount }, 
  currency, 
  destroyExpenditure,
  budget
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
      { displayDate(date) }: { title || 'Untitled' } { currency }{ formatNumber(amount) } 
      <button onClick={handleEdit}>Edit</button> 
      <button onClick={handleDelete}>Delete</button>
      { (showEdit) ? 
        <EditItem {...{ item, currency, setShowEdit, budget }} /> : null }
    </>
  );
}

export default connect(null, { destroyExpenditure })(Item);
