import React, {Component} from 'react';
import CellWrap from '../cell-wrap';
// import Row from '../row';
import Button from '../button';

class App extends Component {
  state = {
    initialWidth: this.props.initialWidth,
    initialHeight: this.props.initialHeight,
    cellSize: this.props.cellSize
  }

  // drawInitialRow = () => {
  //   const itemsRow = [];
  //   for (let i = 0; i < this.state.initialHeight; i++) {
  //     itemsRow.push(
  //         <Row 
  //           key={i} 
  //           idRow={i} 
  //           countCell={this.state.initialWidth} 
  //           countRow={this.state.initialHeight} 
  //           sizeCell={this.state.cellSize} 
  //           onMouseEnterHandler={(e) => {this.state.onMouseEnterHandler(e)}}/>
  //       )
  //   }
  // }

  appendColums = () => {
    this.setState({initialWidth: this.state.initialWidth + 1});
  }

  appendRows = () => {
    this.setState({initialHeight: this.state.initialHeight + 1});
  }

  removeColumns = () => {
    if (this.state.initialWidth > 1) {
      this.setState({initialWidth: this.state.initialWidth - 1});
    }
  }

  removeRows = () => {
    if (this.state.initialHeight > 1) {
      this.setState({initialHeight: this.state.initialHeight - 1});
    }
  }

  onMouseEnterHandler = (e) => {
    console.log(e.target.attributes['coord'].value);
    console.log('enter');
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

    return (
    <div className="app" style={styledApp}>
      <CellWrap 
        onMouseEnterHandler={(e) => {this.onMouseEnterHandler(e)}} 
        countCell={initialWidth} 
        countRow={initialHeight} 
        sizeCell={cellSize} />
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

export default App;
