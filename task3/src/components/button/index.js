import React from 'react';

const Button = ({ changeCountCell, mouseOut, typeBtn, sizeBtn, classBtn, index, displayBtn }) => {

  const initialStyleBtn = {
    width: `${sizeBtn}px`,
    height: `${sizeBtn}px`,
    top: '',
    left: '',
    bottom: '',
    right: '',
    display: ''
  }

  const installStyle = (style = initialStyleBtn) => {
    switch (typeBtn) {
      case 'minusCol':
        return {
          ...style,
          top: 0,
          left: `${index*(sizeBtn+2) + 3}px`,
          display: displayBtn
        };
      case 'minusRow':
        return {
          ...style,
          top: `${index*(sizeBtn+2) + 3}px`,
          left: 0,
          display: displayBtn
        };
      case 'plusCol':
        return {
          ...style,
          top: `${sizeBtn + 5}px`,
          right: 0
        };
      case 'plusRow':
        return {
          ...style,
          bottom: 0,
          left: `${sizeBtn + 5}px`
        };
      default:
        return style;
    }
  }

  const classListNew = ['button', ...classBtn].join(' ');

  return <button 
            onClick={() => {changeCountCell()}} 
            onMouseOut={() => mouseOut()}
            className={classListNew} 
            data-index={index} 
            style = { installStyle() } 
          />
}

export default Button;