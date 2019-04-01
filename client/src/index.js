import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import 'materialize-css';

import App from './component/App';
import reducers from './reducers';

// Creat store here with combined reducers and middleware:redux-Thunk
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  // pass store to react-redux here
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
