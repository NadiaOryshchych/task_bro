import React from 'react';

const Cell = ({sizeCell}) => {
  const styledCell = {
    width: `${sizeCell}px`,
    height: `${sizeCell}px`
  };
  return (
    <div className="box" style={styledCell}></div>
  )
}

export default Cell;
