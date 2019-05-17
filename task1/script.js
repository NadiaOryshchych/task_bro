window.addEventListener('DOMContentLoaded', function () {
   'use strict';
   
   let boxWrap = document.querySelector('.box-wrap'),
       minusCol = document.querySelector('.minus-col'),
       minusRow = document.querySelector('.minus-row'),
       plusCol = document.querySelector('.plus-col'),
       plusRow = document.querySelector('.plus-row');

   addEvents();  
   function addEvents() {
      const boxes = document.querySelectorAll('.box');
      for (let i = 0; i < boxes.length; i++) {
         // або можна mousemove
         boxes[i].addEventListener('mouseenter', function () {
            showMinusRow();
            minusRow.style.top = this.offsetTop + 'px';
            showMinusCol();
            minusCol.style.left = this.offsetLeft + 'px ';
         });
      }

      minusCol.addEventListener('mouseenter', function () {
         showMinusRow();
         showMinusCol();
      });
      minusCol.addEventListener('mouseleave', hideMinus);

      minusRow.addEventListener('mouseenter', function () {
         showMinusRow();
         showMinusCol();
      });
      minusRow.addEventListener('mouseleave', hideMinus);

      boxWrap.addEventListener('mouseenter', function () {
         showMinusRow();
         showMinusCol();
      });
      boxWrap.addEventListener('mouseleave', hideMinus);
   }

   function showMinusRow() {
      const boxRows = document.querySelectorAll('.box-row');
      if (boxRows.length > 1) {
         minusRow.style.display = 'flex';
      }
   }
   function showMinusCol() {
      const boxCol = document.querySelectorAll('.box-row .box:nth-child(2)');
      if (boxCol.length != 0) {
         minusCol.style.display = 'flex';
      }
   }
   function hideMinus() {
      minusRow.style.display = 'none';
      minusCol.style.display = 'none';
   }

   //addCol
   plusCol.addEventListener('click', function () {
      const boxRows = document.querySelectorAll('.box-row');
      for (let i = 0; i < boxRows.length; i++) {
         const col = document.createElement('div');
         col.className = "box";
         boxRows[i].appendChild(col);
      };
      addEvents();
   });

   // addRow
   plusRow.addEventListener('click', function () {
      const boxRows = document.querySelectorAll('.box-row');
      const row = document.createElement('div');
      row.className = "box-row";
      row.innerHTML = boxRows[0].innerHTML;
      boxWrap.appendChild(row);
      addEvents();
   });

   // delRow
   minusRow.addEventListener('click', function() {
      const indexRow = Math.floor(this.offsetTop / plusCol.offsetHeight) - 1;
      const boxRows = document.getElementsByClassName('box-row');
      const delRow = boxRows[indexRow];
      delRow.parentNode.removeChild(delRow);
      hideMinus();
   });

   // delCol
   minusCol.addEventListener('click', function() {
      const indexCol = Math.floor(this.offsetLeft / plusCol.offsetWidth);
      const boxDel = document.querySelectorAll(`.box-row .box:nth-child(${indexCol})`);
      for (let i = 0; i < boxDel.length; i++) {
         const delCol = boxDel[i];
         delCol.parentNode.removeChild(delCol);
      }
      hideMinus();
   });
});