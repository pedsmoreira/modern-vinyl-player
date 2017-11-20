// @flow

import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import playerStore from "stores/playerStore";

import AlbumCover from "components/AlbumCover";
import PlayerControls from "components/PlayerControls";
import PlayerProgress from "components/PlayerProgress";

import "./NowPlayingSidebar.scss";

@observer
export default class NowPlayingSidebar extends React.Component<*> {
  render() {
    return (
      <div className="NowPlayingSidebar">
        {this.renderPlayer()}
        {this.renderPlaceholder()}
      </div>
    );
  }

  renderPlaceholder() {
    if (playerStore.track) return null;

    return (
      <div className="NowPlayingSidebar__select card">
        <div className="card-body">
          Select a <i className="fa fa-music" /> song
        </div>
      </div>
    );
  }

  renderPlayer() {
    if (!playerStore.track) return null;

    const albumKey = (playerStore.album || {}).key;
    const albumUrl = `/albums/${albumKey}`;

    return (
      <div className="NowPlayingSidebar__player">
        <h2 className="NowPlayingSidebar__player-title animated fadeInDown">Now Playing</h2>

        <Link to={albumUrl}>
          <h3 className="NowPlayingSidebar__player-song animated fadeInDown" key={playerStore.track.key}>
            {playerStore.track.name}
          </h3>
        </Link>

        <div className="animated fadeIn" key={albumKey}>
          <Link to={albumUrl}>
            <AlbumCover album={playerStore.album} />
          </Link>

          <PlayerProgress />
          <PlayerControls />
        </div>
      </div>
    );
  }
}
