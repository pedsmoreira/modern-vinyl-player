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
      <div className="NowPlayingSidebar">{playerStore.track ? this.renderPlayer() : this.renderPlaceholder()}</div>
    );
  }

  renderPlaceholder() {
    return (
      <div>
        Select a <i className="fa fa-music" /> song to play
      </div>
    );
  }

  renderPlayer() {
    const albumKey = (playerStore.album || {}).key;

    return (
      <div className="NowPlayingSidebar__player">
        <h2 className="NowPlayingSidebar__player-title animated fadeInDown">Now Playing</h2>

        <h3 className="NowPlayingSidebar__player-song animated fadeInDown" key={playerStore.track.key}>
          {playerStore.track.name}
        </h3>

        <div className="animated fadeIn" key={albumKey}>
          <Link to={`albums/${albumKey}`}>
            <AlbumCover album={playerStore.album} />
          </Link>

          <PlayerProgress />
          <PlayerControls />
        </div>
      </div>
    );
  }
}
