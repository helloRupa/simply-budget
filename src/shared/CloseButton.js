import React from 'react';
import Button from './Button';

function CloseButton({ callback }) {
  return <Button callback={callback} className="close" display="X" />
}

export default CloseButton;