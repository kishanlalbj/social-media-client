import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.querySelector('#app'));

// TODO: check if this is possible
// root.render(() => (
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// ));

root.render(<App />);
