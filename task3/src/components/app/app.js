import React, {Component} from 'react';
// import Table from '../table';
import Button from '../button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxTable: [],
      coordsX: '',
      coordsY: '',
      displayCol: '',
      displayRow: ''
    }
  }
  
  componentDidMount() {
    this.createTable();
  }

  putIndex = (arr) => {
    arr.forEach((row, i) => {
      row.forEach((col, j) => {
        col.idrow = i + 1;
        col.idcol = j + 1;
      });
    });
    return arr;
  }

  createTable = () => {
    const {initialWidth, initialHeight} = this.props;
    let boxes = [];
    for (let i = 0; i < initialHeight; i++) {
      boxes[i] = [];
      for (let j = 0; j < initialWidth; j++) {
        boxes[i].push({
          idrow: '',
          idcol: ''
        })
      }
    }
    this.putIndex(boxes);
    this.setState({boxTable: boxes});
  }

  showMinus(e) {
    const target = e.target;
    const classList = target.classList;
    const dataset = target.dataset;
    // console.log(dataset);
    if (classList.contains('cell')) {
      this.setState({
        coordsX: dataset.idcol,
        coordsY: dataset.idrow
      });
      // (this.state.boxTable.length > 1) ? this.setState({displayRow: 'flex'}) : this.setState({displayRow: 'none'});
      // (this.state.boxTable[0].length > 1) ? this.setState({displayCol: 'flex'}) : this.setState({displayCol: 'none'});
      if (this.state.boxTable.length > 1) {
        this.setState({displayRow: 'flex'});
      }
      if (this.state.boxTable[0].length > 1) {
        this.setState({displayCol: 'flex'});
      }
    } else if (classList.contains('minus-col')) {
      this.setState({displayRow: 'none'});
    } else if (classList.contains('minus-row')) {
      this.setState({displayCol: 'none'});
    } else if (classList.contains('app')) {
      this.setState({displayRow: 'none'});
      this.setState({displayCol: 'none'});
    }
  }

  hideMinus = () => {
    this.setState({displayRow: 'none'});
    this.setState({displayCol: 'none'});
  }

  appendColumns = () => {
    const { boxTable } = this.state;
    const rows = [];
    const colCount = boxTable[0].length;
    boxTable.forEach((row, i) => {
      let newRow = row.slice(0);
      newRow.push({
        idrow: i+1,
        idcol: colCount+1
      }); 
      rows.push(newRow);
    });
    this.putIndex(rows);
    this.setState({ boxTable: rows });
  }

  appendRows = () => {
    const { boxTable } = this.state;
    const rows = [];
    boxTable.forEach(row => rows.push([...row]));
    let newRow = [];
    const newRowI = boxTable.length;
    const colCount = rows[0].length;
    for (let i = 0; i < colCount; i++) {
      newRow.push({
        idrow: newRowI+1,
        idcol: i+1
      });
    }
    rows.push(newRow);
    this.putIndex(rows);
    this.setState({ boxTable: rows });
  }

  removeColumns = () => {
    const { boxTable, coordsX } = this.state;
    const indexCol = coordsX - 1;

    if (boxTable[0].length > 1) {
      let rows = [];
      boxTable.forEach(row => {
        const newRow = [
          ...row.slice(0, indexCol),
          ...row.slice(indexCol + 1)
        ];
        rows.push(newRow);
      });
      this.putIndex(rows);
      this.setState({ boxTable: rows });
    }

    if (boxTable[0].length === +(coordsX) || boxTable[0].length === 2) {
      this.setState({ displayCol: 'none' });
    }
  }

  removeRows = () => {
    const { boxTable, coordsY } = this.state;
    const indexRow = coordsY-1;
    if (boxTable.length > 1) {
      let rows = [
        ...boxTable.slice(0, indexRow),
        ...boxTable.slice(indexRow + 1)
      ];
      this.putIndex(rows);
      this.setState({boxTable: rows});
    }

    if (boxTable.length === +(coordsY) || boxTable.length === 2) {
      this.setState({ displayRow: 'none' });
    }
  }

  onMouseEnterTable = (e) => {
    // console.log(e.target);
    // console.log(e.target.attributes['idrow'].value, e.target.attributes['idcol'].value);
  }
  
  render() {
    const {cellSize} = this.props;
    const {boxTable, coordsX, coordsY, displayCol, displayRow} = this.state;

    const styledApp = {
      padding: `${cellSize + 4}px`
    };

    const sizedBtn = {
      width: `${cellSize}px`,
      height: `${cellSize}px`
    };
    const styledMinusCol = {
      top: 0,
      left: `${coordsX*(cellSize+2) + 3}px`,
      display: displayCol
    }
    const styledMinusRow = {
      top: `${coordsY*(cellSize+2) + 3}px`,
      left: 0,
      display: displayRow
    }
    const styledPlusCol = {
      top: `${cellSize + 5}px`,
      right: 0
    }
    const styledPlusRow = {
      bottom: 0,
      left: `${cellSize + 5}px`
    }

    const colCount = boxTable.length ? boxTable[0].length : 0;
    const rowCount = boxTable.length;

    let drowTable = [];
    boxTable.forEach((row, i) => {
      let newRow = row.map((cell, j) => {
        return (
          <div
            className="cell"
            style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
            data-idrow={i + 1}
            data-idcol={cell.idcol}
            key={`${i}${j}`} >
          </div>
        )
      })
      drowTable.push(newRow);
    });

    return (
    <div className="app" style={styledApp}
      onMouseMove={(e) => {this.showMinus(e)}} >
      <div className = "table" 
          style={{height: `${rowCount*52}px`, width: `${colCount*52}px` }} >
          {drowTable}
      </div>
      <Button 
        changeCountCell={() => {this.removeColumns()}} 
        classBtn={['minus', 'minus-col']} 
        styledBtn={{...styledMinusCol, ...sizedBtn}}
        index={coordsX} />
      <Button 
        changeCountCell={() => {this.removeRows()}} 
        classBtn={['minus', 'minus-row']} 
        styledBtn={{...styledMinusRow, ...sizedBtn}}
        index={coordsY} />
      <Button 
        changeCountCell={() => {this.appendColumns()}} 
        classBtn={['plus', 'plus-col']} 
        styledBtn={{...styledPlusCol, ...sizedBtn}} />
      <Button 
        changeCountCell={() => {this.appendRows()}} 
        classBtn={['plus', 'plus-row']} 
        styledBtn={{...styledPlusRow, ...sizedBtn}} />
    </div>
  );
  }
}

// class App extends Component {
//   state = {
//     initialWidth: this.props.initialWidth,
//     initialHeight: this.props.initialHeight,
//     cellSize: this.props.cellSize,
//     boxTable: []
//   }

//   appendColums = () => {
//     this.setState({initialWidth: this.state.initialWidth + 1});
//   }

//   appendRows = () => {
//     this.setState({initialHeight: this.state.initialHeight + 1});
//   }

//   removeColumns = () => {
//     if (this.state.initialWidth > 1) {
//       this.setState({initialWidth: this.state.initialWidth - 1});
//     }
//   }

//   removeRows = () => {
//     if (this.state.initialHeight > 1) {
//       console.log(this.state.initialHeight);
//       this.setState({initialHeight: this.state.initialHeight - 1});
//     }
//   }

//   onMouseEnterHandler = (e) => {
//     console.log(e.target.attributes['idrow'].value, e.target.attributes['idcol'].value);
//     console.log(this.state.boxTable);
//   }
  
//   render() {
//     const {initialWidth, initialHeight, cellSize} = this.state;
//     console.log(initialHeight);

//     const styledApp = {
//       padding: `${cellSize + 4}px`
//     };

//     const sizedBtn = {
//       width: `${cellSize}px`,
//       height: `${cellSize}px`
//     };
//     const posMinusCol = {
//       top: 0,
//       left: `${cellSize + 5}px`
//     }
//     const posMinusRow = {
//       top: `${cellSize + 5}px`,
//       left: 0
//     }
//     const posPlusCol = {
//       top: `${cellSize + 5}px`,
//       right: 0
//     }
//     const posPlusRow = {
//       bottom: 0,
//       left: `${cellSize + 5}px`
//     }

//     return (
//     <div className="app" style={styledApp}>
//       <Table
//         boxTable={this.state.boxTable}
//         countCol={initialWidth} 
//         countRow={initialHeight} 
//         sizeCell={cellSize}
//         boxTest={this.onMouseEnterHandler} />
//       <Button 
//         changeCountCell={() => {this.removeColumns()}} 
//         classBtn={['minus', 'minus-col']} 
//         styledBtn={{...posMinusCol, ...sizedBtn}} />
//       <Button 
//         changeCountCell={() => {this.removeRows()}} 
//         classBtn={['minus', 'minus-row']} 
//         styledBtn={{...posMinusRow, ...sizedBtn}} />
//       <Button 
//         changeCountCell={() => {this.appendColums()}} 
//         classBtn={['plus', 'plus-col']} 
//         styledBtn={{...posPlusCol, ...sizedBtn}} />
//       <Button 
//         changeCountCell={() => {this.appendRows()}} 
//         classBtn={['plus', 'plus-row']} 
//         styledBtn={{...posPlusRow, ...sizedBtn}} />
//     </div>
//   );
//   }
// }

export default App;
