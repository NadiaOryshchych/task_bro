import React from 'react';
import Button from '../button';

const MinusCol = ({sizeCell}) => {
  const classBtn = ['minus', 'minus-col']

  return (
    <Button classBtn={classBtn} sizeCell={sizeCell}/>
  )
}

export default MinusCol;