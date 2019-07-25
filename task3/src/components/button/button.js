import React from 'react';

const Button = ({classBtn, styledBtn, changeCountCell, index}) => {
  const classList = ['button'];
  const classListNew = [...classList, ...classBtn].join(' ');
  
  return <button onClick={() => {changeCountCell()}} className={classListNew} data-index={index} style={styledBtn}></button>
}

export default Button;