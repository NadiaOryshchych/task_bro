window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  
  class Table {
    constructor() {
      this.app = document.querySelector('.app');
      this.boxWrap = document.querySelector('.boxWrap');
      this.boxRows = document.querySelectorAll('.box-row');
      this.minusCol = document.querySelector('.minus-col');
      this.minusRow = document.querySelector('.minus-row');
      this.plusCol = document.querySelector('.plus-col');
      this.plusRow = document.querySelector('.plus-row');

      this.sizeBox = 52;

      this.app.addEventListener('mousemove', this.showMinus.bind(this));
      this.plusCol.addEventListener('mouseout', this.hideMinus.bind(this));
      this.plusRow.addEventListener('mouseout', this.hideMinus.bind(this));
      this.minusCol.addEventListener('mouseout', this.hideMinus.bind(this));
      this.minusRow.addEventListener('mouseout', this.hideMinus.bind(this));
      this.plusCol.addEventListener('click', this.appendColumns.bind(this));
      this.plusRow.addEventListener('click', this.appendRows.bind(this));
      this.minusCol.addEventListener('click', this.removeColumns.bind(this));
      this.minusRow.addEventListener('click', this.removeRows.bind(this));
    }

    putIndex() {
      for (let i = 0; i < this.boxWrap.childElementCount; i++) {
        const boxInRow = document.querySelectorAll(`.box-row:nth-child(${[i+1]}) .box`);
        for (let j = 0; j < boxInRow.length; j++) {
          boxInRow[j].setAttribute('data-index-row', [i + 1]);
          boxInRow[j].setAttribute('data-index-col', [j + 1]);
        }
      }
    }

    hideMinus() {
      this.minusRow.style.display = 'none';
      this.minusCol.style.display = 'none';
    }
    
    showMinus(event) {
      const target = event.target;
      const classList = target.classList;
      const dataset = target.dataset;
      if (classList.contains('box')) {
        this.minusRow.setAttribute('data-index', dataset.indexRow);
        this.minusCol.setAttribute('data-index', dataset.indexCol);
        this.minusRow.style.top = this.sizeBox * dataset.indexRow + 3 + 'px';
        this.minusCol.style.left = this.sizeBox * dataset.indexCol + 3 + 'px';
        if (this.boxWrap.childElementCount > 1) {
          this.minusRow.style.display = 'flex';
        }
        if (this.boxRows[0].children.length > 1) {
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
        this.hideMinus();
      }
    }

    appendColumns() {
      const count = this.boxRows[0].childElementCount;
      for (let i = 0; i < this.boxWrap.childElementCount; i++) {
        const col = document.createElement('div');
        col.className = 'box';
        col.setAttribute('data-index-row', [i + 1]);
        col.setAttribute('data-index-col', [count + 1]);
        this.boxWrap.children[i].appendChild(col);
      }
    }

    appendRows() {
      const row = document.createElement('div');
      row.className = 'box-row';
      for (let i = 0; i < this.boxRows[0].childElementCount; i++) {
        const col = document.createElement('div');
        col.className = 'box';
        col.setAttribute('data-index-row', [this.boxWrap.childElementCount + 1]);
        col.setAttribute('data-index-col', [i + 1]);
        row.appendChild(col);
      }
      this.boxWrap.appendChild(row);
      console.log(this.boxWrap.childElementCount);
    }

    removeColumns(event) {
      const datasetCol = event.target.dataset.index;
      const box = document.querySelectorAll('.box');
      for (let i = 0; i < box.length; i++) {
        if (box[i].dataset.indexCol == datasetCol) {
          box[i].parentNode.removeChild(box[i]);
        }
      }
      if (this.boxRows[0].children.length  < datasetCol || this.boxRows[0].children.length == 1) {
        this.minusCol.style.display = 'none';
      }
      console.log(this.boxWrap.childElementCount);
      console.log(this.boxRows[0].children.length);
      this.putIndex();
      console.log(2);
    }

    removeRows(event) {
      const datasetRow = event.target.dataset.index;
      const delRow = this.boxWrap.children[datasetRow - 1];
      delRow.parentNode.removeChild(delRow);
      if (this.boxWrap.childElementCount < datasetRow || this.boxWrap.childElementCount == 1) {
        this.minusRow.style.display = 'none';
      }
      this.putIndex();
      console.log(this.boxWrap.childElementCount);
    }
  }

  let table = new Table();
  table.putIndex();

});