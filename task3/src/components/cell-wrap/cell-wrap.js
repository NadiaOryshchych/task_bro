import React from 'react';
import Row from '../row';

const CellWrap = ({countCell, countRow, sizeCell}) => {
  const itemsRow = [];
  for (let i = 0; i < countRow; i++) {
    const idRow = i;
    itemsRow.push(
      <Row key={i} idRow={i} countCell={countCell} countRow={countRow} sizeCell={sizeCell}/>
    )
    console.log(idRow)
  }

  return ( 
    <div className = "boxWrap" >
      {itemsRow}
    </div>
  )
}

export default CellWrap;
