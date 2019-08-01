import React from 'react';

const Table = ({ cellSize, table }) => {

  return (
    <div className = "table" >
      {
        table.map((row, i) => {
          return (
            <div className="row">
              {
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
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default Table;