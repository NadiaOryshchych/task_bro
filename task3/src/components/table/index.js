import React from 'react';

const Table = ({ cellSize, table }) => {

  return (
    <div className = "table" >
      {
        table.map((row, i) => (
          <div className="row" key={i}>
            {
              row.map((cell, j) => (
                <div
                  className="cell"
                  style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
                  data-idrow={i + 1}
                  data-idcol={j + 1}
                  key={`${row[0].idRow}${cell.idCol}`} >
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default Table;