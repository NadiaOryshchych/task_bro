import React, {Component} from 'react';
import Table from '../table';
import Button from '../button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxTable: []
    }
  }
  
  componentDidMount() {
    this.createTable();
  }

  createTable = () => {
    const {initialWidth, initialHeight, cellSize} = this.props;
    let boxes = [];
    for (let i = 0; i < initialHeight; i++) {
      boxes[i] = [];
      for (let j = 0; j < initialWidth; j++) {
        boxes[i].push(
          <div
            className="box-table" 
            style={ {width: `${cellSize}px`, height: `${cellSize}px`, top: `${i*52+1}px`, left: `${j*52+1}px`}} 
            idrow={i}
            idcol={j}
            key={`${i}${j}`}
            onMouseEnter={(e) => {this.onMouseEnterHandler(e)}} >
          </div>
        )
      }
    }
    this.setState({boxTable: boxes});
  }

  appendColums = () => {
    const { cellSize } = this.props;
    const { boxTable } = this.state;
    const rows = [];
    const colCount = boxTable[0].length;
    boxTable.forEach((row, i) => {
      let newRow = row.slice(0);
      newRow.push(
        <div
          className="box-table" 
          style={ {width: `${cellSize}px`, height: `${cellSize}px`, top: `${i*52+1}px`, left: `${colCount*52+1}px`}} 
          idrow={i}
          idcol={colCount}
          key={`${i}${colCount}`}
          onMouseEnter={(e) => {this.onMouseEnterHandler(e)}} >
        </div>
      );
      rows.push(newRow);
    });
    this.setState({boxTable: rows});
  }

  appendRows = () => {
    const { cellSize } = this.props;
    const { boxTable } = this.state;
    const rows = [];
    boxTable.forEach(row => rows.push([...row]));
    let newRow = [];
    const newRowI = boxTable.length;
    const colCount = rows[0].length;
    for (let i = 0; i < colCount; i++) {
      newRow.push(
        <div
          className="box-table" 
          style={ {width: `${cellSize}px`, height: `${cellSize}px`, top: `${newRowI*52+1}px`, left: `${i*52+1}px`}} 
          idrow={newRowI}
          idcol={i}
          key={`${newRowI}${i}`}
          onMouseEnter={(e) => {this.onMouseEnterHandler(e)}} >
        </div>
      );
    }
    rows.push(newRow);
    this.setState({boxTable: rows});
  }

  removeColumns = () => {
    if (this.state.initialWidth > 1) {
      this.setState({initialWidth: this.state.initialWidth - 1});
    }
  }

  removeRows = () => {
    const { boxTable } = this.state;
    let newRows = [];
    

  }

  onMouseEnterHandler = (e) => {
    console.log(e.target.attributes['idrow'].value, e.target.attributes['idcol'].value);
    console.log(this.state.boxTable);
  }
  
  render() {
    const {cellSize} = this.props;
    const {boxTable} = this.state;
    console.log(boxTable);

    const styledApp = {
      padding: `${cellSize + 4}px`
    };

    const sizedBtn = {
      width: `${cellSize}px`,
      height: `${cellSize}px`
    };
    const posMinusCol = {
      top: 0,
      left: `${cellSize + 5}px`
    }
    const posMinusRow = {
      top: `${cellSize + 5}px`,
      left: 0
    }
    const posPlusCol = {
      top: `${cellSize + 5}px`,
      right: 0
    }
    const posPlusRow = {
      bottom: 0,
      left: `${cellSize + 5}px`
    }

    const colCount = boxTable.length ? boxTable[0].length : 0;
    const rowCount = boxTable.length;

    return (
    <div className="app" style={styledApp}>
      <div className = "box-wrap" 
          style={{height: `${rowCount*52+2}px`, width: `${colCount*52+2}px` }}>
        {boxTable}
      </div>
      <Button 
        changeCountCell={() => {this.removeColumns()}} 
        classBtn={['minus', 'minus-col']} 
        styledBtn={{...posMinusCol, ...sizedBtn}} />
      <Button 
        changeCountCell={() => {this.removeRows()}} 
        classBtn={['minus', 'minus-row']} 
        styledBtn={{...posMinusRow, ...sizedBtn}} />
      <Button 
        changeCountCell={() => {this.appendColums()}} 
        classBtn={['plus', 'plus-col']} 
        styledBtn={{...posPlusCol, ...sizedBtn}} />
      <Button 
        changeCountCell={() => {this.appendRows()}} 
        classBtn={['plus', 'plus-row']} 
        styledBtn={{...posPlusRow, ...sizedBtn}} />
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
