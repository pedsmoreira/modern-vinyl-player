import React from "react";
import {render} from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";

import Api from "./prime-rest/Api";
import * as paths from "./paths";

import "bootstrap/dist/css/bootstrap.css";
import "animate.css/animate.css";

import AppView from "./views/AppView";
import HomeView from "./views/app/HomeView";
import AlbumsView from "./views/app/AlbumsView";
import AlbumView from "./views/app/AlbumView";
import ArtistsView from "./views/app/ArtistsView";
import ArtistView from "./views/app/ArtistView";
import PlayerView from "./views/app/PlayerView";

/*
 * Set api path
 */
Api.base = paths.API

render(
  <Router history={browserHistory}>
    <Route path="/" component={AppView}>
      <IndexRoute component={HomeView}/>
      <Route path="albums" component={AlbumsView}/>
      <Route path="albums/:album" component={AlbumView}/>
      <Route path="artists" component={ArtistsView}/>
      <Route path="artists/:artist" component={ArtistView}/>
      <Route path="player" component={PlayerView}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
