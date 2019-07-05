import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';

ReactDOM.render(
  <>
  <App initialHeight={4} initialWidth={4} cellSize={50} />
  {/* <App initialHeight={5} initialWidth={5} cellSize={50} />
  <App initialHeight={6} initialWidth={6} cellSize={50} /> */}
  </>
  , document.getElementById('root'));
