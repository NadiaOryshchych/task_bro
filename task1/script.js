window.addEventListener('DOMContentLoaded', function () {
   'use strict';
   
   let app = document.querySelector('.app'),
       boxWrap = document.querySelector('.box-wrap'),
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
            }
            minusRow.style.top = this.offsetTop + 'px';

            let boxCol = document.querySelectorAll('.box-row .box:nth-child(2)');
            if (boxCol.length != 0) {
               minusCol.style.display = 'flex';
            }
            minusCol.style.left = this.offsetLeft + 'px ';
         });
      }

      minusCol.addEventListener('mouseenter', showMinus);
      minusCol.addEventListener('mouseleave', hideMinus);
      
      minusRow.addEventListener('mouseenter', showMinus);
      minusRow.addEventListener('mouseleave', hideMinus);

      boxWrap.addEventListener('mouseenter', showMinus);
      boxWrap.addEventListener('mouseleave', hideMinus);
   }

   function hideMinus() {
      minusRow.style.display = 'none';
      minusCol.style.display = 'none';
   }
   function showMinus() {
      let boxRows = document.querySelectorAll('.box-row');
      if (boxRows.length > 1) {
         minusRow.style.display = 'flex';
      }
      let boxCol = document.querySelectorAll('.box-row .box:nth-child(2)');
      if (boxCol.length != 0) {
         minusCol.style.display = 'flex';
      }
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
      const boxRows = document.querySelectorAll('.box-row');
      const delRow = boxRows[indexRow];
      // boxRows.splice(index, 1); - не працює
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

/*
-де використовувати які змінні(и let замени на const везьде, где переменная не перезаписывается)
- прочитати про конструктори і класи! */
