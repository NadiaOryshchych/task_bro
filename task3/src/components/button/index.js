import React from 'react';
import cz from 'classnames';

const Button = ({ changeCountCell, mouseOut, typeBtn, sizeBtn, index, displayBtn }) => {

  const initialStyleBtn = {
    width: `${sizeBtn}px`,
    height: `${sizeBtn}px`,
    top: '',
    left: '',
    bottom: '',
    right: '',
    display: ''
  }

  const installStyle = {
    minusCol: {
      top: 0,
      left: `${index*(sizeBtn+2) + 3}px`,
      display: displayBtn
    },
    minusRow: {
      top: `${index*(sizeBtn+2) + 3}px`,
      left: 0,
      display: displayBtn
    },
    plusCol: {
      top: `${sizeBtn + 5}px`,
      right: 0
    },
    plusRow: {
      bottom: 0,
      left: `${sizeBtn + 5}px`
    }
  }

  const installClassBtn = {
    minusCol: ['minus minus-col'],
    minusRow: ['minus minus-row'],
    plusCol: ['plus plus-col'],
    plusRow: ['plus plus-row']
  }

  return <button 
            onClick={() => {changeCountCell()}} 
            onMouseOut={() => mouseOut()}
            className={cz('button', ...installClassBtn[typeBtn])} 
            data-index={index} 
            style = { {...initialStyleBtn, ...installStyle[typeBtn]} } 
          />
}

export default Button;