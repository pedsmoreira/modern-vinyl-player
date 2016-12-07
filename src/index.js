import React from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Api from './prime-rest/Api'
import * as paths from './paths'

import AppView from './views/AppView'
import HomeView from './views/app/HomeView'
import AlbumsView from './views/app/AlbumsView'
import AlbumView from './views/app/AlbumView'
import ArtistsView from './views/app/ArtistsView'
import ArtistView from './views/app/ArtistView'

/*
 * Import CSS
 */
import 'bootstrap/dist/css/bootstrap.css'
import 'animate.css/animate.css'
import './index.css';

/*
 * Set api path
 */
Api.base = paths.API

render(
  <Router history={browserHistory}>
    <Route path="/" component={AppView}>
      <IndexRoute component={HomeView}/>
      <Route path="album" component={AlbumsView}/>
      <Route path="album/:album" component={AlbumView}/>
      <Route path="artist" component={ArtistsView}/>
      <Route path="artist/:artist" component={ArtistView}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
