// @flow

import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import playerStore from "stores/playerStore";

import AlbumCover from "components/AlbumCover";
import PlayerControls from "components/PlayerControls";
import PlayerProgress from "components/PlayerProgress";

import "./NowPlayingFooter.scss";

@observer
export default class NowPlayingFooter extends React.Component<*> {
  render() {
    return (
      <div className="NowPlayingFooter">
        {this.renderPlayer()}
        {this.renderPlaceholder()}
      </div>
    );
  }

  renderPlaceholder() {
    if (playerStore.track) return null;

    return (
      <div className="NowPlayingFooter__select">
        Select a <i className="fa fa-music" /> song
      </div>
    );
  }

  renderPlayer() {
    if (!playerStore.track) return null;

    const albumKey = (playerStore.album || {}).key;
    const albumUrl = `/albums/${albumKey}`;

    return (
      <div className="NowPlayingFooter__player">
        <Link to={albumUrl}>
          <AlbumCover album={playerStore.album} />
        </Link>

        <h2 className="NowPlayingFooter__player-title">Now Playing</h2>

        <Link to={albumUrl}>
          <h3 className="NowPlayingFooter__player-song">{playerStore.track.name}</h3>
        </Link>

        <PlayerProgress />
        <PlayerControls />
      </div>
    );
  }
}
