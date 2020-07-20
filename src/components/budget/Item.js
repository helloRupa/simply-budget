import React, { useState } from 'react';
import EditItem from './EditItem';

function Item({ item, item: { id, date, title, amount }, currency }) {
  const [showEdit, setShowEdit] = useState(false);

  const handleClick = () => {
    setShowEdit(!showEdit);
  };

  return (
    <>
      { date }: { title } { currency }{ amount } <button onClick={handleClick}>Edit</button>
      { (showEdit) ? <EditItem item={item} currency={currency} setShowEdit={setShowEdit} /> : '' }
    </>
  );
}

export default Item;
