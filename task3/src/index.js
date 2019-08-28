import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

ReactDOM.render(<App initialHeight={5} initialWidth={6} cellSize={50} />, document.getElementById('root'));
