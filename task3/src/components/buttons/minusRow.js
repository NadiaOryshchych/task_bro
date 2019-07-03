import React from 'react';
import Button from '../button';

const MinusRow = ({sizeCell}) => {
  const classBtn = ['minus', 'minus-row']

  return (
    <Button classBtn={classBtn} sizeCell={sizeCell}/>
  )
}

export default MinusRow;