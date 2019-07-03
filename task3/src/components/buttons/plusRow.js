import React from 'react';
import Button from '../button';

const PlusRow = ({sizeCell}) => {
  const classBtn = ['plus', 'plus-row']

  return (
    <Button classBtn={classBtn} sizeCell={sizeCell}/>
  )
}

export default PlusRow;