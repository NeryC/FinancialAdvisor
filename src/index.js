import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import store from './redux/reducers';
import App from './routes/App';

const mainContainer = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  mainContainer
);
