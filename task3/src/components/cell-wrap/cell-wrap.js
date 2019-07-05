import React, {Component} from 'react';
import Row from '../row';

class CellWrap extends Component {

  render() {
    const {countCell, countRow, sizeCell, onMouseEnterHandler} = this.props;

    
    const itemsRow = [];
    for (let i = 0; i < countRow; i++) {
      itemsRow.push(
          <Row 
            key={i} 
            idRow={i} 
            countCell={countCell} 
            countRow={countRow} 
            sizeCell={sizeCell} 
            onMouseEnterHandler={(e) => {onMouseEnterHandler(e)}}/>
        )
    }

    return ( 
      <div className = "boxWrap" >
        {itemsRow}
      </div>
    )
  }
}

export default CellWrap;
