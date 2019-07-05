import React from 'react';
import Cell from '../cell';

const Row = ({countCell, sizeCell, idRow, onMouseEnterHandler}) => {
  const itemsCell = [];
  for (let i = 0; i < countCell; i++) {
    itemsCell.push(
      <Cell key={i} idRow={idRow} idCell={i} sizeCell={sizeCell} onMouseEnterHandler={(e) => {onMouseEnterHandler(e)}}/>
    )
  }

  return (
    <div className="box-row">
      {itemsCell}
    </div>
  )
}

export default Row;
