import React from 'react';
import Row from '../row';

const CellWrap = ({countCell, countRow, sizeCell}) => {
  const itemsRow = [];
  for (let i = 0; i < countRow; i++) {
    itemsRow.push(
      <Row key={i} countCell={countCell} countRow={countRow} sizeCell={sizeCell}/>
    )
  }

  return ( 
    <div className = "boxWrap" >
      {itemsRow}
    </div>
  )
}

export default CellWrap;
