import React, {Component} from 'react';

class Table extends Component {

  render() {

    const {boxTable, countCol, countRow, sizeCell, boxTest} = this.props;
    console.log(countRow);
    
    let boxes = boxTable;

    for (let i = 0; i < countRow; i++) {
      boxes[i] = [];
      for (let j = 0; j < countCol; j++) {
        boxes[i].push(
          <div
            className="box-table" 
            style={ {width: `${sizeCell}px`, height: `${sizeCell}px`, top: `${i*52+1}px`, left: `${j*52+1}px`}} 
            idrow={i}
            idcol={j}
            key={`${i}${j}`}
            onMouseEnter={(e) => {boxTest(e)}}
            >
          </div>
        )
      }
    }
    // console.log(boxes);
    // console.log(boxes.length);
    // console.log(boxes[0]);

    return (
      <div className = "box-wrap" style={{height: `${boxes.length*52+2}px`, width: `${boxes[0].length*52+2}px` }}>
        {boxes}
      </div>
    )
  }

}

export default Table;