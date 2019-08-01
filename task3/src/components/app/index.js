import React, {Component} from 'react';
import Table from '../table';
import Button from '../button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxTable: [],
      indexMinusCol: '',
      indexMinusRow: '',
      displayMinusCol: '',
      displayMinusRow: ''
    }
  }
  
  componentDidMount() {
    this.createTable();
  }

  putIndex = (arr) => {
    arr.forEach((row, i) => {
      row.forEach((col, j) => {
        col.idRow = i + 1;
        col.idCol = j + 1;
      });
    });
    return arr;
  }

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
    this.setState({ boxTable: boxes });
  }

  showMinus = (e) => {
    const target = e.target;
    const classList = target.classList;
    const dataset = target.dataset;
    if (classList.contains('cell')) {
      this.setState({
        indexMinusCol: dataset.idcol,
        indexMinusRow: dataset.idrow
      });
      (this.state.boxTable.length > 1) ? this.setState({ displayMinusRow: 'flex' }) : this.setState({ displayMinusRow: 'none' });
      (this.state.boxTable[0].length > 1) ? this.setState({ displayMinusCol: 'flex' }) : this.setState({ displayMinusCol: 'none' });
    } else if (classList.contains('minus-col')) {
      this.setState({ displayMinusRow: 'none' });
    } else if (classList.contains('minus-row')) {
      this.setState({ displayMinusCol: 'none' });
    } else if (classList.contains('app')) {
      this.hideMinus();
    }
  }

  hideMinus = () => {
    this.setState({ displayMinusRow: 'none' });
    this.setState({ displayMinusCol: 'none' });
  }

  appendColumns = () => {
    const { boxTable } = this.state;
    const rows = [];
    const colCount = boxTable[0][boxTable[0].length - 1].idCol;
    boxTable.forEach((row, i) => {
      let newRow = row.slice(0);
      newRow.push({
        idRow: i+1,
        idCol: colCount+1
      }); 
      rows.push(newRow);
    });
    this.setState({ boxTable: rows });
  }

  appendRows = () => {
    const { boxTable } = this.state;
    const rows = [];
    boxTable.forEach(row => rows.push([...row]));
    let newRow = [];
    const newRowI = boxTable[boxTable.length - 1][0].idRow;
    const colCount = rows[0].length;
    for (let i = 0; i < colCount; i++) {
      newRow.push({
        idRow: newRowI+1,
        idCol: i+1
      });
    }
    rows.push(newRow);
    this.setState({ boxTable: rows });
  }

  removeColumns = () => {
    const { boxTable, indexMinusCol } = this.state;
    const indexCol = indexMinusCol - 1;

    if (boxTable[0].length > 1) {
      let rows = [];
      boxTable.forEach(row => {
        const newRow = [
          ...row.slice(0, indexCol),
          ...row.slice(indexCol + 1)
        ];
        rows.push(newRow);
      });
      this.setState({ boxTable: rows });
    }

    if (boxTable[0].length === +(indexMinusCol) || boxTable[0].length === 2) {
      this.setState({ displayMinusCol: 'none' });
    }
  }

  removeRows = () => {
    const { boxTable, indexMinusRow } = this.state;
    const indexRow = indexMinusRow-1;
    if (boxTable.length > 1) {
      let rows = [
        ...boxTable.slice(0, indexRow),
        ...boxTable.slice(indexRow + 1)
      ];
      this.setState({boxTable: rows});
    }

    if (boxTable.length === +(indexMinusRow) || boxTable.length === 2) {
      this.setState({ displayMinusRow: 'none' });
    }
  }
  
  render() {
    const { cellSize } = this.props;
    const { boxTable, indexMinusCol, indexMinusRow, displayMinusCol, displayMinusRow } = this.state;

    return (
    <div className="app" style={{padding: `${cellSize + 4}px`}}
      onMouseMove={(e) => {this.showMinus(e)}} >
      <Table 
        cellSize={cellSize} 
        table={boxTable}
      />
      <Button 
        changeCountCell={(event) => {this.removeColumns(event)}} 
        mouseOut={() => this.hideMinus()}
        typeBtn={'minusCol'}
        sizeBtn={cellSize} 
        classBtn={['minus', 'minus-col']} 
        index={indexMinusCol} 
        displayBtn={displayMinusCol}
      />
      <Button 
        changeCountCell={() => {this.removeRows()}} 
        mouseOut={() => this.hideMinus()}
        typeBtn={'minusRow'}
        sizeBtn={cellSize} 
        classBtn={['minus', 'minus-row']} 
        index={indexMinusRow} 
        displayBtn={displayMinusRow}
      />
      <Button 
        changeCountCell={() => {this.appendColumns()}} 
        mouseOut={() => this.hideMinus()}
        typeBtn={'plusCol'}
        sizeBtn={cellSize} 
        classBtn={['plus', 'plus-col']} 
      />
      <Button 
        changeCountCell={() => {this.appendRows()}} 
        mouseOut={() => this.hideMinus()}
        typeBtn={'plusRow'}
        sizeBtn={cellSize} 
        classBtn={['plus', 'plus-row']} 
      />
    </div>
  );
  }
}

// добавити претіер еслінт

export default App;
