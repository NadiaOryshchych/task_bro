window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  class Table {
    constructor(app, boxWrap, boxRows, boxCol, boxesInRow, minusCol, minusRow, plusCol, plusRow) {
      this.app = app;
      this.boxWrap = boxWrap;
      this.boxRows = boxRows;
      this.boxCol = boxCol;
      this.boxesInRow = boxesInRow;
      this.minusCol = minusCol;
      this.minuRow = minusRow;
      this.plusCol = plusCol;
      this.plusRow = plusRow;
    }
    addEvents() {
      this.app.addEventListener('mousemove', function (event) {
        const target = event.target;
        if (target.classList.contains('box')) {
          minusRow.style.top = target.offsetTop - 1 + 'px';
          minusCol.style.left = target.offsetLeft - 1 + 'px';
          if (boxRows.length > 1) {
            minusRow.style.display = 'flex';
          }
          if (boxCol.length != 0) {
            minusCol.style.display = 'flex';
          }
        }
        if (target.classList.contains('minus-col')) {
          minusRow.style.display = 'none';
        }
        if (target.classList.contains('minus-row')) {
          minusCol.style.display = 'none';
        }
        if (target.classList.contains('app')) {
          minusRow.style.display = 'none';
          minusCol.style.display = 'none';
        }
      });
    }
    addColumns() {
      for (let i = 0; i < this.boxRows.length; i++) {
        const col = document.createElement('div');
        col.className = "box";
        this.boxRows[i].appendChild(col);
      }
    }
    addRows() {
      const row = document.createElement('div');
      row.className = "box-row";
      row.innerHTML = boxRows[0].innerHTML;
      boxWrap.appendChild(row);
    }
    removeColumns() {
      const indexCol = Math.floor(minusCol.offsetLeft / 50);
      const boxDel = document.querySelectorAll(`.box-row .box:nth-child(${indexCol})`);
      for (let i = 0; i < boxDel.length; i++) {
        const delCol = boxDel[i];
        delCol.parentNode.removeChild(delCol);
      }
      let boxesInRow = document.querySelectorAll('.box-row:first-child .box');
      if (boxesInRow.length < indexCol || boxesInRow.length == 1) {
        minusCol.style.display = 'none';
      }
    }
    removeRows() {
      const indexRow = Math.floor(minusRow.offsetTop / 50) - 1;
      const delRow = boxRows[indexRow];
      delRow.parentNode.removeChild(delRow);
      if (boxRows.length <= indexRow || boxRows.length == 1) {
        minusRow.style.display = 'none';
      }
    }
  }

  let app = document.querySelector('.app'),
    boxWrap = document.querySelector('.boxWrap'),
    boxRows = document.getElementsByClassName('box-row'),
    boxCol = document.querySelectorAll('.box-row .box:nth-child(2)'),
    boxesInRow = document.querySelectorAll('.box-row:first-child .box'),
    minusCol = document.querySelector('.minus-col'),
    minusRow = document.querySelector('.minus-row'),
    plusCol = document.querySelector('.plus-col'),
    plusRow = document.querySelector('.plus-row');

  const table = new Table(app, boxWrap, boxRows, boxCol, boxesInRow, minusCol, minusRow, plusCol, plusRow);
  table.addEvents();
  plusCol.addEventListener('click', function() {
    table.addColumns();
  });
  plusRow.addEventListener('click', function() {
    table.addRows();
  });
  minusRow.addEventListener('click', function() {
    table.removeRows();
  });
  minusCol.addEventListener('click', function() {
    table.removeColumns();
  });

});