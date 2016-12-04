import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import reducer from './reducers'

import App from './containers/App'
import Home from './containers/app/Home'
import Albums from './containers/app/Albums'
import Album from './containers/app/Album'
import Artists from './containers/app/Artists'
import Artist from './containers/app/Artist'

import 'bootstrap/dist/css/bootstrap.css'
import 'animate.css/animate.css'
import './index.css';

const store = createStore(reducer)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="album" component={Albums}/>
        <Route path="album/:album" component={Album}/>
        <Route path="artist" component={Artists}/>
        <Route path="artist/:artist" component={Artist}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
