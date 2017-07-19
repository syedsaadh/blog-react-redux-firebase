import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router';
import App from './containers/App';
import ArticlePage from './containers/ArticlePage';

import configureStore from './store/configureStore'
import DevTools from './containers/DevTools'
import { ConnectedRouter } from 'react-router-redux'
import { createBrowserHistory } from 'history'
var store = configureStore();

var history = createBrowserHistory();


render(
  <Provider store={store} >
    <div>
      <DevTools />
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/post/:slug" component={ArticlePage} />
        </div>
      </ConnectedRouter>
    </div>
  </Provider>,
  document.getElementById('root')
)