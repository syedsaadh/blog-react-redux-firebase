import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom';
import App from './containers/App';

import configureStore from './store/configureStore'
import DevTools from './containers/DevTools'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { createBrowserHistory } from 'history'
var store = configureStore();

var history = createBrowserHistory();


render(
  <Provider store={store} >
    <div>
      <DevTools />
      <ConnectedRouter history={history}>
          <Route path="/" component={App} />
      </ConnectedRouter>
    </div>
  </Provider>,
  document.getElementById('root')
)