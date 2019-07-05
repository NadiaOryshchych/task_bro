import React from 'react';

const Cell = ({sizeCell, idRow, idCell, onMouseEnterHandler}) => {
  const styledCell = {
    width: `${sizeCell}px`,
    height: `${sizeCell}px`
  };
  return (
    <div className="box" style={styledCell} coord={`${idRow}:${idCell}`} onClick={(e) => {onMouseEnterHandler(e)}}></div>
  )
}

export default Cell;
