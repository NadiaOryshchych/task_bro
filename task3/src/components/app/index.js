import React, {Component} from 'react';
import Table from '../table';
import Button from '../button';

class App extends Component {
  constructor(props) {
    // можна конструктор не писати, а просто писати state =  {}
    // createTable() викликати перед state
    // коли не обов'язково використовувати конструктор - почитати

    super(props);
    this.state = {
      boxTable: this.createTable(),
      indexMinusCol: 1,
      indexMinusRow: 1,
      displayMinusCol: 'none',
      displayMinusRow: 'none'
    }
  }
  
  // componentDidMount() {
  //   this.createTable();
  // }

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
    // this.setState({ boxTable: boxes });  
  }

  showMinus = (e) => {
    const { boxTable } = this.state;
    const target = e.target;
    const classList = target.classList;
    const dataset = target.dataset;

    // let displayMinusRow = classList.contains('cell') || classList.contains('minus-row') ? 'flex' : 'none';
    // let displayMinusCol = classList.contains('cell') || classList.contains('minus-col') ? 'flex' : 'none';

    // let displayMinusRow = 'none';
    // let displayMinusCol = 'none';
    // let indexMinusRow = 1;
    // let indexMinusCol = 1;
    // switch (classList.contains) {
    //   case 'cell':
    //     // indexMinusCol = dataset.idcol,
    //     // indexMinusRow = dataset.idrow,
    //     return displayMinusRow = 'flex';
    //     // displayMinusCol = 'flex';
    //     // return displayMinusRow;
    //   case 'minus-col':
    //     return displayMinusRow = 'none';
    //   case 'minus-row':
    //     return displayMinusCol = 'none';
    //   default:
    //     this.hideMinus();
    // }

    // if (boxTable.length > 1) {
    //   displayMinusRow = classList.contains('cell') || classList.contains('minus-row') ? 'flex' : 'none';
    // }
    // if (boxTable[0].length > 1) {
    //   displayMinusCol = classList.contains('cell') || classList.contains('minus-col') ? 'flex' : 'none';
    // }

    // switch (true) {
    //   case (classList.contains('cell') && boxTable.length > 1):
    //     return displayMinusRow = 'flex';
    //   case (classList.contains('cell') && boxTable[0].length > 1):
    //     return displayMinusCol = 'flex';
    //   case classList.contains('minus-col'):
    //     return displayMinusRow = 'none';
    //   case classList.contains('minus-row'):
    //     return displayMinusCol = 'none';
    //   case classList.contains('app'):
    //     return this.hideMinus();
    // }

    // this.setState({
    //   indexMinusCol: dataset.idcol ? dataset.idcol : this.state.indexMinusCol,
    //   indexMinusRow: dataset.idrow ? dataset.idrow : this.state.indexMinusRow,
    //   displayMinusRow: displayMinusRow,
    //   displayMinusCol: displayMinusCol
    // });
    
    if (classList.contains('cell')) {
      this.setState({
        indexMinusCol: +(dataset.idcol),
        indexMinusRow: +(dataset.idrow)
      });
      (boxTable.length > 1) ? this.setState({ displayMinusRow: 'flex' }) : this.setState({ displayMinusRow: 'none' });
      (boxTable[0].length > 1) ? this.setState({ displayMinusCol: 'flex' }) : this.setState({ displayMinusCol: 'none' });
    } else if (classList.contains('minus-col')) {
      this.setState({ displayMinusRow: 'none' });
    } else if (classList.contains('minus-row')) {
      this.setState({ displayMinusCol: 'none' });
    } else if (classList.contains('app')) {
      this.hideMinus();
    }
    // переробити на норм функцію
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
      let rows = boxTable.map(row => ([
        ...row.slice(0, indexCol),
        ...row.slice(indexCol + 1)
      ]));
      const displayMinusCol = (rowLength === indexMinusCol || rowLength <= 2) ? 'none' : 'flex';
      this.setState({ boxTable: rows, displayMinusCol }); 
    }
  }

  removeRows = () => {
    const { boxTable, indexMinusRow } = this.state;
    const tableLength = boxTable.length;
    const indexRow = indexMinusRow-1;
    if (tableLength > 1) {
      let rows = [
        ...boxTable.slice(0, indexRow),
        ...boxTable.slice(indexRow + 1)
      ];
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

// добавити претіер еслінт

// яка версія eslint встановлена глобально

export default App;
