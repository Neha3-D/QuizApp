/*
  FILE: src/index.js
  WHAT THIS FILE CARRIES:
  - Entry point of the React app.
  - Loads global styles (index.css) and renders <App /> inside <div id="root"> of public/index.html.
*/
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
