// @flow

import React from "react";
import { observer } from "mobx-react";

import playerStore from "stores/playerStore";

import AlbumCover from "components/AlbumCover";
import PlayerControls from "components/PlayerControls";
import PlayerProgress from "components/PlayerProgress";

import "./NowPlayingFooter.scss";

@observer
export default class NowPlayingFooter extends React.Component<*> {
  render() {
    return <div className="NowPlayingFooter">{playerStore.track ? this.renderPlayer() : this.renderPlaceholder()}</div>;
  }

  renderPlaceholder() {
    return (
      <div>
        Select a <i className="fa fa-music" /> song to play
      </div>
    );
  }

  renderPlayer() {
    return (
      <div className="NowPlayingFooter__player">
        <AlbumCover album={playerStore.album} />

        <h2 className="NowPlayingFooter__player-title">Now Playing</h2>

        <h3 className="NowPlayingFooter__player-song">{playerStore.track.name}</h3>

        <PlayerProgress />
        <PlayerControls />
      </div>
    );
  }
}
