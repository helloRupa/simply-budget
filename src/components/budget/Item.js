import React, { useState } from 'react';
import EditItem from './EditItem';
import { formatNumber, displayDate } from '../../utils/format';
import { connect } from 'react-redux';
import { destroyExpenditure } from '../../actions/expenditure_actions';
import ClickOrHold from '../../shared/ClickOrHold';

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
      <button onClick={handleDelete} className="delete-expense">X</button>

      <ClickOrHold holdCallback={handleEdit}>
        <span>{ displayDate(date) }</span>
        <span className="expense-title">{ title || 'Untitled' }</span> 
        <span className="expense-spent">{ currency }{ formatNumber(amount) }</span>
      </ClickOrHold>

      { (showEdit) ? 
        <EditItem {...{ item, currency, setShowEdit, budget }} /> : null }
    </>
  );
}

export default connect(null, { destroyExpenditure })(Item);
