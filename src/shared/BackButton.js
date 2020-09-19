import React from 'react';
import Button from './Button';

function BackButton({ callback }) {
  return <Button callback={callback} className="back" display="Back" />
}

export default BackButton;