import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch, Link } from 'react-router-dom';

import App from './containers/App';
import ArticlePage from './containers/ArticlePage';
import NoMatch from './containers/NoMatch';

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
          <Link to="/">Home</Link>&nbsp;&nbsp;
          <Link to="/sda">No Match</Link>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/post/:slug" component={ArticlePage} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </ConnectedRouter>
    </div>
  </Provider>,
  document.getElementById('root')
)