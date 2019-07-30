import React from 'react';

const Table = ({ cellSize, table }) => {

  const colCount = table.length ? table[0].length : 0;
  const rowCount = table.length;

  return (
    <div className = "table" 
      style={{height: `${rowCount*52}px`, width: `${colCount*52}px` }} >
      {
        table.map((row, i) => {
          return (
            row.map((cell, j) => {
              return (
                <div
                  className="cell"
                  style={{ width: `${cellSize}px`, height: `${cellSize}px`, backgroundColor: `${cell.background}` }}
                  data-idrow={i + 1}
                  data-idcol={j + 1}
                  key={`${row[0].idRow}${cell.idCol}`} >
                </div>
              )
            })
          )
        })
      }
    </div>
  )
}

export default Table;