import React from 'react';
import Cell from '../cell';

const Row = ({countCell, sizeCell}) => {
  const itemsCell = [];
  for (let i = 0; i < countCell; i++) {
    const idCol = i;
    itemsCell.push(
      <Cell key={i} idCell={i} sizeCell={sizeCell}/>
    )
    console.log(idCol)
  }

  return (
    <div className="box-row">
      {itemsCell}
    </div>
  )
}

export default Row;
