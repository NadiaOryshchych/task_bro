window.addEventListener('DOMContentLoaded', function () {
   'use strict';
   
   let app = document.querySelector('.app'),
       boxWrap = document.querySelector('#box-wrap'),
       minusCol = document.querySelector('.minus-col'),
       minusRow = document.querySelector('.minus-row'),
       plusCol = document.querySelector('.plus-col'),
       plusRow = document.querySelector('.plus-row');

   addEvents();  
   function addEvents() {
      let boxes = document.querySelectorAll('.box');
      for (let i = 0; i < boxes.length; i++) {
         // або можна mousemove
         boxes[i].addEventListener('mouseenter', function() {
            let boxRows = document.querySelectorAll('.box-row');
            if (boxRows.length > 1) {
               minusRow.style.display = 'flex';
               minusRow.style.top = this.offsetTop + 'px';
            }
            let boxCol = document.querySelectorAll('.box-row .box:nth-child(2)');
            if (boxCol.length != 0) {
               minusCol.style.cssText = 'display: flex;\
               left:' + this.offsetLeft + 'px ';
            }
         });
      }
      // leave і enter не підтримують делегування
      boxWrap.addEventListener('mouseleave', minusNone);
   }

   function minusNone() {
      minusRow.style.display = 'none';
      minusCol.style.display = 'none';
   }

   //addCol
   plusCol.addEventListener('click', function () {
      let boxRows = document.querySelectorAll('.box-row');
      for (let i = 0; i < boxRows.length; i++) {
         let col = document.createElement('div');
         col.className = "box";
         boxRows[i].appendChild(col);
      };
      addEvents();
   });

   // addRow
   plusRow.addEventListener('click', function () {
      let boxRows = document.querySelectorAll('.box-row');
      let row = document.createElement('div');
      row.className = "box-row";
      row.innerHTML = boxRows[0].innerHTML;
      boxWrap.appendChild(row);
      addEvents();
   });

   // delRow
   minusRow.addEventListener('click', function() {
      let index = Math.floor(this.offsetTop / plusCol.offsetHeight) - 1;
      let boxRows = document.querySelectorAll('.box-row');
      let del = boxRows[index];
      // boxRows.splice(index, 1); - не працює
      del.parentNode.removeChild(del);
      minusNone();
   });

   // delCol
   minusCol.addEventListener('click', function() {
      let index = Math.floor(this.offsetLeft / plusCol.offsetWidth);
      let boxDel = document.querySelectorAll(`.box-row .box:nth-child(${index})`);
      for (let i = 0; i < boxDel.length; i++) {
         let del = boxDel[i];
         del.parentNode.removeChild(del);
      }
      minusNone();
   });

});