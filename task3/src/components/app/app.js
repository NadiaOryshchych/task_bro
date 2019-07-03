import React, {Component} from 'react';
import CellWrap from '../cell-wrap';
import Button from '../button';

class App extends Component {
  state = {
    initialWidth: 4,
    initialHeight: 4,
    cellSize: 50
  }

  appendColums() {
    this.setState({initialWidth: this.state.initialWidth + 1});
  }

  appendRows() {
    this.setState({initialHeight: this.state.initialHeight + 1});
  }

  removeColumns() {
    if (this.state.initialWidth > 1) {
      this.setState({initialWidth: this.state.initialWidth - 1});
    }
  }

  removeRows() {
    if (this.state.initialHeight > 1) {
      this.setState({initialHeight: this.state.initialHeight - 1});
    }
  }
  
  render() {
    const {initialWidth, initialHeight, cellSize} = this.state;

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
    const styledMinusCol = {...posMinusCol, ...sizedBtn};

    const posMinusRow = {
      top: `${cellSize + 5}px`,
      left: 0
    }
    const styledMinusRow = {...posMinusRow, ...sizedBtn};

    const posPlusCol = {
      top: `${cellSize + 5}px`,
      right: 0
    }
    const styledPlusCol = {...posPlusCol, ...sizedBtn};

    const posPlusRow = {
      bottom: 0,
      left: `${cellSize + 5}px`
    }
    const styledPlusRow = {...posPlusRow, ...sizedBtn};

    const classMinusCol = ['minus', 'minus-col'];
    const classMinusRow = ['minus', 'minus-row'];
    const classPlusCol = ['plus', 'plus-col'];
    const classPlusRow = ['plus', 'plus-row']
    return (
    <div className="app" style={styledApp}>
      <CellWrap countCell={initialWidth} countRow={initialHeight} sizeCell={cellSize}/>
      <Button changeCountCell={() => {this.removeColumns()}} classBtn={classMinusCol} sizeCell={cellSize} styledBtn={styledMinusCol} />
      <Button changeCountCell={() => {this.removeRows()}} classBtn={classMinusRow} sizeCell={cellSize} styledBtn={styledMinusRow} />
      <Button changeCountCell={() => {this.appendColums()}} classBtn={classPlusCol} sizeCell={cellSize} styledBtn={styledPlusCol} />
      <Button changeCountCell={() => {this.appendRows()}} classBtn={classPlusRow} sizeCell={cellSize} styledBtn={styledPlusRow} />
    </div>
  );
  }
}

export default App;
