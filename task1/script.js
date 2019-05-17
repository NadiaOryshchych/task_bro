window.addEventListener('DOMContentLoaded', function () {
   'use strict';
   
   let app = document.querySelector('.app'),
       minusCol = document.querySelector('.minus-col'),
       minusRow = document.querySelector('.minus-row'),
       plusCol = document.querySelector('.plus-col'),
       plusRow = document.querySelector('.plus-row');

   addEvents();  
   function addEvents() {
      app.addEventListener('mousemove', function (event) {
         showMinus();
         if (event.target.className == 'box') {
            minusRow.style.top = event.target.offsetTop - 1 + 'px';
            minusCol.style.left = event.target.offsetLeft - 1 + 'px';
         }
      });
      app.addEventListener('mouseleave', hideMinus);   
   }
   function showMinus() {
      const boxRows = document.querySelectorAll('.box-row');
      if (boxRows.length > 1) {
         minusRow.style.display = 'flex';
      }
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
      app.appendChild(row);
      addEvents();
   });

   // delRow
   minusRow.addEventListener('click', function() {
      const indexRow = Math.floor(this.offsetTop / plusCol.offsetHeight);
      const boxRows = document.getElementsByClassName('box-row');
      const delRow = boxRows[indexRow];
      delRow.parentNode.removeChild(delRow);
      hideMinus();
      this.style.top = (parseInt(this.style.top) - plusCol.offsetHeight + 1) + 'px';
   });

   // delCol
   minusCol.addEventListener('click', function() {
      const indexCol = Math.floor(this.offsetLeft / plusCol.offsetWidth) + 2;
      const boxDel = document.querySelectorAll(`.box-row .box:nth-child(${indexCol})`);
      for (let i = 0; i < boxDel.length; i++) {
         const delCol = boxDel[i];
         delCol.parentNode.removeChild(delCol);
      }
      hideMinus();
      this.style.left = (parseInt(this.style.left) - plusCol.offsetWidth + 2) + 'px';
   });
});