import React from 'react';
import Button from '../button';

const PlusCol = ({sizeCell}) => {
  const classBtn = ['plus', 'plus-col']

  return (
    <Button classBtn={classBtn} sizeCell={sizeCell}/>
  )
}

export default PlusCol;