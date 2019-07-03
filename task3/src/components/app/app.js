import React, {Component} from 'react';
import CellWrap from '../cell-wrap';
import {MinusCol, MinusRow, PlusCol, PlusRow} from '../buttons';
import Button from '../button/button';

class App extends Component {
  state = {
    initialWidth: 4,
    initialHeight: 4,
    cellSize: 50
  }
  
  render() {
    const {initialWidth, initialHeight, cellSize} = this.state;
    return (
    <div className="app">
      <CellWrap countCell={initialWidth} countRow={initialHeight} sizeCell={cellSize}/>
      <MinusCol sizeCell={cellSize}/>
      <MinusRow sizeCell={cellSize}/>
      <PlusCol sizeCell={cellSize}/>
      <PlusRow sizeCell={cellSize}/>
    </div>
  );
  }
}

export default App;
