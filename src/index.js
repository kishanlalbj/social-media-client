import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import axios from './utils/axios';
import verifyJwt from './utils/verifyJwt';
import './index.css';

axios.interceptors.request.use((request) => {
  let token = localStorage.getItem('tk');
  if (verifyJwt(token)) request.headers.authorization = `Bearer ${token}`;

  return request;
});

const root = ReactDOM.createRoot(document.querySelector('#app'));

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
