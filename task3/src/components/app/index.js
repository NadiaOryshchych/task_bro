import React, {Component} from 'react';
import Table from '../table';
import Button from '../button';

// добавити претіер еслінт

// яка версія eslint встановлена глобально

// коли не обов'язково використовувати конструктор - почитати

class App extends Component {
  
  createTable = () => {
    const { initialWidth, initialHeight } = this.props;
    let boxes = [];
    for (let i = 0; i < initialHeight; i++) {
      boxes[i] = [];
      for (let j = 0; j < initialWidth; j++) {
        boxes[i].push({
          idRow: i + 1,
          idCol: j + 1
        })
      }
    }
    return boxes;
  }

  state = {
    boxTable: this.createTable(),
    indexMinusCol: 1,
    indexMinusRow: 1,
    displayMinusCol: 'none',
    displayMinusRow: 'none'
  }

  showMinus = (e) => {
    const { boxTable } = this.state;
    const target = e.target;
    const classList = target.classList;
    const dataset = target.dataset;
    
    let displayMRow = 'mRow';
    let displayMCol = 'mCol';

    if (classList.contains('cell')) {
      (boxTable.length > 1) ? displayMRow = 'flex': displayMRow = 'none';
      (boxTable[0].length > 1) ? displayMCol = 'flex': displayMCol = 'none';
    } else if (classList.contains('minus-col')) {
      displayMRow = 'none';
    } else if (classList.contains('minus-row')) {
      displayMCol = 'none';
    } else if (classList.contains('app')) {
      this.hideMinus();
    }

    this.setState({
      indexMinusCol: dataset.idcol ? +(dataset.idcol) : this.state.indexMinusCol,
      indexMinusRow: dataset.idrow ? +(dataset.idrow) : this.state.indexMinusRow,
      displayMinusRow: displayMRow,
      displayMinusCol: displayMCol
    });

    // if (classList.contains('cell')) {
    //   this.setState({
    //     indexMinusCol: +(dataset.idcol),
    //     indexMinusRow: +(dataset.idrow)
    //   });
    //   (boxTable.length > 1) ? this.setState({ displayMinusRow: 'flex' }) : this.setState({ displayMinusRow: 'none' });
    //   (boxTable[0].length > 1) ? this.setState({ displayMinusCol: 'flex' }) : this.setState({ displayMinusCol: 'none' });
    // } else if (classList.contains('minus-col')) {
    //   this.setState({ displayMinusRow: 'none' });
    // } else if (classList.contains('minus-row')) {
    //   this.setState({ displayMinusCol: 'none' });
    // } else if (classList.contains('app')) {
    //   this.hideMinus();
    // }
  }

  hideMinus = () => {
    this.setState({ displayMinusRow: 'none' });
    this.setState({ displayMinusCol: 'none' });
  }

  appendColumns = () => {
    const { boxTable } = this.state;
    const lastColIndex = boxTable[0][boxTable[0].length - 1].idCol;
    const newTable = boxTable.map((row, i) => ([...row, {
      idRow: i + 1,
      idCol: lastColIndex + 1
    }]));
    this.setState({ boxTable: newTable });
  }

  appendRows = () => {
    const { boxTable } = this.state;
    const lastRow = boxTable[boxTable.length - 1];
    const newRow = lastRow.map((item) => {
      return ({
        idRow: item.idRow + 1,
        idCol: item.idCol
      })
    });
    this.setState({ boxTable: [...boxTable, newRow] });
  }

  removeColumns = () => {
    const { boxTable, indexMinusCol } = this.state;
    const rowLength = boxTable[0].length;
    const indexCol = indexMinusCol - 1;

    if (rowLength > 1) {
      let rows = boxTable.map(row => [...row.filter((сell, i) => i !== indexCol)]);
      const displayMinusCol = (rowLength === indexMinusCol || rowLength <= 2) ? 'none' : 'flex';
      this.setState({ boxTable: rows, displayMinusCol }); 
    }
  }

  removeRows = () => {
    const { boxTable, indexMinusRow } = this.state;
    const tableLength = boxTable.length;
    const indexRow = indexMinusRow-1;

    if (tableLength > 1) {
      let rows = boxTable.filter((row, i) => i !== indexRow);
      // let rows = boxTable.filter((row, i) => row[i] !== row[indexRow]);
      const displayMinusRow = (tableLength === indexMinusRow || tableLength <= 2) ? 'none' : 'flex'
      this.setState({ boxTable: rows, displayMinusRow });
    }
  }
  
  render() {
    const { cellSize } = this.props; 
    const { boxTable, indexMinusCol, indexMinusRow, displayMinusCol, displayMinusRow } = this.state;

    return (
      <div className="app" style={{padding: `${cellSize + 4}px`}} onMouseMove={this.showMinus} >
        <Table 
          cellSize={cellSize} 
          table={boxTable}
        />
        <Button 
          changeCountCell={this.removeColumns} 
          mouseOut={this.hideMinus}
          typeBtn={'minusCol'}
          sizeBtn={cellSize} 
          index={indexMinusCol} 
          displayBtn={displayMinusCol}
        />
        <Button 
          changeCountCell={this.removeRows} 
          mouseOut={this.hideMinus}
          typeBtn={'minusRow'}
          sizeBtn={cellSize} 
          index={indexMinusRow} 
          displayBtn={displayMinusRow}
        />
        <Button 
          changeCountCell={this.appendColumns} 
          mouseOut={this.hideMinus}
          typeBtn={'plusCol'}
          sizeBtn={cellSize} 
        />
        <Button 
          changeCountCell={this.appendRows} 
          mouseOut={this.hideMinus}
          typeBtn={'plusRow'}
          sizeBtn={cellSize} 
        />
      </div>
    );
  }
}

export default App;
