// src/index.js or src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Make sure Tailwind is imported
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
