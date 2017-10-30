import {createStore, applyMiddleware, compose} from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {buildReducer} from './reducerBuilder';

class App {
  use(reducers) {
    const middlewareArr = [];
    let composeEnhancer = compose;
    if (process.env.NODE_ENV === 'development') {
      const {createLogger} = require('redux-logger');
      middlewareArr.push(createLogger({
        level: 'log',
        duration: false,
        timestamp: true,
        logger: console,
        logErrors: true,
        diff: true
      }));
    }
    composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeEnhancer;
    const enhancer = composeEnhancer(applyMiddleware(...middlewareArr));
    const finalCreateStore = compose(enhancer)(createStore);
    this.store = finalCreateStore(buildReducer(reducers), window.__INITIAL_STATE__);
  }

  useModels(models) {
    this.use(models);
    return this;
  }

  useRoot(root) {
    this.root = root;
    return this;
  }

  start(node) {
    const rootElement = document.getElementById(node);
    ReactDOM.render(
      <Provider store={this.store}>
        {this.root}
      </Provider>, rootElement);
  }
}

export default App;
