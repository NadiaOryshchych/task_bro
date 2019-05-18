window.addEventListener('DOMContentLoaded', function () {
   'use strict';
   
   let app = document.querySelector('.app'),
       boxWrap = document.querySelector('.boxWrap'),
       minusCol = document.querySelector('.minus-col'),
       minusRow = document.querySelector('.minus-row'),
       plusCol = document.querySelector('.plus-col'),
       plusRow = document.querySelector('.plus-row');

   // + когда удаляю 1 колонку после удалени кнопка минус не должна исчезнуть, я по сути с нее не уходила
   // и когда наводишь потом на таблицу кнопка выезжает слева, нехорошо смотрится
   // и я бы скрывала кнопку удаления строки когда я на кнопке удаления колонки и наоборот
   // + на нопке плюс после клика появляется рамочка, это в условии так ?

   addEvents();  
   function addEvents() {
      boxWrap.addEventListener('mousemove', function (event) {
         if (event.target.className == 'box') {
            console.log(4);
            showMinus();
            minusRow.style.top = event.target.offsetTop - 1 + 'px';
            minusCol.style.left = event.target.offsetLeft - 1 + 'px';
         }
         if (event.target.className == 'plus') {
            console.log(3);
            if (minusRow.style.dispaly == 'none') {
               minusRow.style.display = 'none';
            }
            if (minusCol.style.dispaly == 'none') {
               minusCol.style.display = 'none';
            }
         }
         if (event.target.className == 'minus-col') {
            console.log(1);
            minusRow.style.display = 'none';
         }
         if (event.target.className == 'minus-row') {
            console.log(2);
            minusCol.style.display = 'none';
         }
      });
      // boxWrap.addEventListener('mouseleave', function hideMinus() {
      //    minusRow.style.display = 'none';
      //    minusCol.style.display = 'none';
      // });   
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
      const indexRow = Math.floor(this.offsetTop / plusCol.offsetHeight);
      const boxRows = document.getElementsByClassName('box-row');
      const delRow = boxRows[indexRow];
      delRow.parentNode.removeChild(delRow);
      this.style.display = 'none';
      // this.style.top = (parseInt(this.style.top) - 52) + 'px';
   });

   // delCol
   minusCol.addEventListener('click', function() {
      const indexCol = Math.floor(this.offsetLeft / plusCol.offsetWidth + 2);
      const boxDel = document.querySelectorAll(`.box-row .box:nth-child(${indexCol})`);
      for (let i = 0; i < boxDel.length; i++) {
         const delCol = boxDel[i];
         delCol.parentNode.removeChild(delCol);
      }
      this.style.display = 'none';
      // this.style.left = (parseInt(this.style.left) - plusCol.offsetWidth + 2) + 'px';
   });

});