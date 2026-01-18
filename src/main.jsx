import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import pkg from '../package.json';

// Print the app version at startup so it's easy to verify which build is running in the browser console
console.log(`Morpheus v${pkg.version}`);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
