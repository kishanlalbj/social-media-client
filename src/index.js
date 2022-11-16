import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

import { CssBaseline, ThemeProvider } from '@mui/material';
import Socket from './socket';
import theme from './theme';
import './index.css';

const root = ReactDOM.createRoot(document.querySelector('#app'));

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Socket />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);
