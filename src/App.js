// @flow

import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import HomeView from "views/Home";
import AlbumView from "views/Album";
import AlbumsView from "views/Albums";
import ArtistView from "views/Artist";
import ArtistsView from "views/Artists";
import NowPlayingView from "views/NowPlaying";

import Navbar from "components/Navbar";
import Menu from "components/Menu";

import "./App.scss";

type Props = {};

export default class App extends React.Component<Props> {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />

          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <Menu />
              </div>

              <div className="col-md-9">
                <Route exact path="/" component={HomeView} />
                <Route path="/albums" component={AlbumsView} />
                <Route path="/albums/:album" component={AlbumView} />
                <Route path="/artists" component={ArtistsView} />
                <Route path="/artists/:artist" component={ArtistView} />
                <Route path="/now" component={NowPlayingView} />
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
