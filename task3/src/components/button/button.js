import React from 'react';

const Button = ({classBtn, styledBtn, changeCountCell}) => {
  const classList = ['button'];
  const classListNew = [...classList, ...classBtn].join(' ');
  
  return <button onClick={() => {changeCountCell()}} className={classListNew} style={styledBtn}></button>
}

export default Button;