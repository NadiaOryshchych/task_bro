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

      this.showBtn = this.showMinus.bind(this);
      this.addCol = this.appendColumns.bind(this);
      this.addRow = this.appendRows.bind(this);
      this.delCol = this.removeColumns.bind(this);
      this.delRow = this.removeRows.bind(this);

      this.app.addEventListener('mousemove', this.showBtn);
      this.plusCol.addEventListener('click', this.addCol);
      this.plusRow.addEventListener('click', this.addRow);
      this.minusCol.addEventListener('click', this.delCol);
      this.minusRow.addEventListener('click', this.delRow);
    }

    showMinus(event) {
      const target = event.target;
      if (target.classList.contains('box')) {
        this.minusRow.style.top = target.offsetTop - 1 + 'px';
        this.minusCol.style.left = target.offsetLeft - 1 + 'px';
        if (this.boxRows.length > 1) {
          this.minusRow.style.display = 'flex';
        }
        if (this.countBoxesInRow != 1) {
          this.minusCol.style.display = 'flex';
        }
      }
      if (target.classList.contains('minus-col')) {
        this.minusRow.style.display = 'none';
      }
      if (target.classList.contains('minus-row')) {
        this.minusCol.style.display = 'none';
      }
      if (target.classList.contains('app')) {
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
    }
    appendRows() {
      const row = document.createElement('div');
      row.className = 'box-row';
      row.innerHTML = this.boxRows[0].innerHTML;
      this.boxWrap.appendChild(row);
      // table.addEvents();
    }
    removeColumns() {
      const indexCol = Math.floor(this.minusCol.offsetLeft / 50);
      const boxDel = document.querySelectorAll(`.box-row .box:nth-child(${indexCol})`);
      for (let i = 0; i < boxDel.length; i++) {
        const delCol = boxDel[i];
        delCol.parentNode.removeChild(delCol);
      }
      this.countBoxesInRow--;
      if (this.countBoxesInRow < indexCol || this.countBoxesInRow == 1) {
        this.minusCol.style.display = 'none';
      }
    }
    removeRows() {
      const indexRow = Math.floor(this.minusRow.offsetTop / 50) - 1;
      const delRow = this.boxRows[indexRow];
      delRow.parentNode.removeChild(delRow);
      if (this.boxRows.length <= indexRow || this.boxRows.length == 1) {
        this.minusRow.style.display = 'none';
      }
    }
    
    // addEvents() {
    //   this.app.addEventListener('mousemove', this.showBtn);
    //   this.plusCol.addEventListener('click', this.addCol);
    //   this.plusRow.addEventListener('click', this.addRow);
    //   this.minusCol.addEventListener('click', this.delCol);
    //   this.minusRow.addEventListener('click', this.delRow);
    // }
  }

  let table = new Table();
  // table.addEvents();

});