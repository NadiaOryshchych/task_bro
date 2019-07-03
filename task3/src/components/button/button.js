import React from 'react';

const Button = ({classBtn, sizeCell}) => {
  const styledBtn = {
    width: `${sizeCell}px`,
    height: `${sizeCell}px`
  };
  const classList = ['button'];
  const classListNew = [...classList, ...classBtn].join(' ');
  
  return <button className={classListNew} style={styledBtn}></button>
}

export default Button;