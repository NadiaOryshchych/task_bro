window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  
  class Table {
    constructor() {
      this.app = document.querySelector('.app');
      this.boxWrap = document.querySelector('.boxWrap');
      this.boxRows = document.getElementsByClassName('box-row');
      this.boxesInRow = document.querySelectorAll('.box-row:first-child .box');
      this.countBoxesInRow = this.boxesInRow.length;
      this.minusCol = document.querySelector('.minus-col');
      this.minusRow = document.querySelector('.minus-row');
      this.plusCol = document.querySelector('.plus-col');
      this.plusRow = document.querySelector('.plus-row');

      this.sizeBox = 52;

      this.app.addEventListener('mousemove', this.showMinus.bind(this));
      this.plusCol.addEventListener('click', this.appendColumns.bind(this));
      this.plusRow.addEventListener('click', this.appendRows.bind(this));
      this.minusCol.addEventListener('click', this.removeColumns.bind(this));
      this.minusRow.addEventListener('click', this.removeRows.bind(this));
    }

    putIndex() {
      for (let i = 0; i < this.boxRows.length; i++) {
        const boxInRow = document.querySelectorAll(`.box-row:nth-child(${[i+1]}) .box`);
        for (let j = 0; j < boxInRow.length; j++) {
          boxInRow[j].setAttribute('data-index-row', [i + 1]);
          boxInRow[j].setAttribute('data-index-col', [j + 1]);
        }
      }
    }

    showMinus(event) {
      const target = event.target,
            classList = target.classList,
            dataset = target.dataset;
      if (classList.contains('box')) {
        this.minusRow.setAttribute('data-index', dataset.indexRow);
        this.minusCol.setAttribute('data-index', dataset.indexCol);
        this.minusRow.style.top = this.sizeBox * dataset.indexRow + 3 + 'px';
        this.minusCol.style.left = this.sizeBox * dataset.indexCol + 3 + 'px';
        if (this.boxRows.length > 1) {
          this.minusRow.style.display = 'flex';
        }
        if (this.countBoxesInRow > 1) {
          this.minusCol.style.display = 'flex';
        }
      }
      if (classList.contains('minus-col')) {
        this.minusRow.style.display = 'none';
      }
      if (classList.contains('minus-row')) {
        this.minusCol.style.display = 'none';
      }
      if (classList.contains('app')) {
        this.minusRow.style.display = 'none';
        this.minusCol.style.display = 'none';
      }
    }
    appendColumns() {
      for (let i = 0; i < this.boxRows.length; i++) {
        const col = document.createElement('div');
        col.className = 'box';
        this.boxRows[i].appendChild(col);
      }
      this.countBoxesInRow++;
      this.putIndex();
    }
    appendRows() {
      const row = document.createElement('div');
      row.className = 'box-row';
      for (let i = 0; i < this.countBoxesInRow; i++) {
        const col = document.createElement('div');
        col.className = 'box';
        row.appendChild(col);
      }
      this.boxWrap.appendChild(row);
      this.putIndex();
    }
    removeColumns(event) {
      const datasetCol = event.target.dataset.index;
      const box = document.querySelectorAll('.box');
      for (let i = 0; i < box.length; i++) {
        if (box[i].dataset.indexCol == datasetCol) {
          box[i].parentNode.removeChild(box[i]);
        }
      }
      this.countBoxesInRow--;
      if (this.countBoxesInRow < datasetCol || this.countBoxesInRow == 1) {
        this.minusCol.style.display = 'none';
      }
      this.putIndex();
    }
    removeRows(event) {
      const datasetRow = event.target.dataset.index;
      const delRow = this.boxRows[datasetRow - 1];
      delRow.parentNode.removeChild(delRow);
      if (this.boxRows.length < datasetRow || this.boxRows.length == 1) {
        this.minusRow.style.display = 'none';
      }
      this.putIndex();
    }
  }

  let table = new Table();
  table.putIndex();

});