// @flow

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AlbumView from "views/Album";
import AlbumsView from "views/Albums";
import ArtistView from "views/Artist";
import ArtistsView from "views/Artists";
import NowPlayingView from "views/NowPlaying";

import Player from "components/Player/Player";
import Navbar from "components/Navbar";
import NowPlayingSidebar from "components/NowPlayingSidebar";
import NowPlayingFooter from "components/NowPlayingFooter";

import "./App.scss";

type Props = {};

export default class App extends React.Component<Props> {
  render() {
    return (
      <Router>
        <div className="App">
          <Player />
          <Navbar />

          <div className="App__content">
            <div className="container">
              <div className="row">
                <div className="col-lg-3">
                  <NowPlayingSidebar />
                  <NowPlayingFooter />
                </div>

                <div className="col-lg-9">
                  <Route exact path="/" component={AlbumsView} />
                  <Route path="/albums/:slug" component={AlbumView} />
                  <Route exact path="/artists" component={ArtistsView} />
                  <Route exact path="/artists/:slug" component={ArtistView} />
                  <Route path="/now" component={NowPlayingView} />
                </div>
              </div>
            </div>
          </div>

          <div className="App__footer text-center">
            <div className="container">
              <p>
                Premiere Player is an experimental project and uses <a href="https://www.youtube.com">YouTube</a> videos
                to play music as a proof of concept.
              </p>

              <p>
                This project was created by <a href="http://www.pedrosm.com">Pedro Moreira</a> and is{" "}
                <a href="https://github.com/pedsmoreira/premiere-player">available on GitHub</a>.
              </p>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
