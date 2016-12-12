import React from "react";

import playerStore from "../../stores/playerStore";

import AlbumCover from "../../components/album/AlbumCover";
import ArtistName from "../../components/artist/ArtistName";
import PlayerPrevious from "../../components/player/PlayerPrevious";
import PlayerNext from "../../components/player/PlayerNext";

export default class PlayerView extends React.Component {
  render() {
    return (
      <div className="player-view">
        <AlbumName album={this.album}/>
        <AlbumCover album={this.album}/>

        <div className="player-view_track">{playerStore.track.name}</div>
        by <ArtistName artist={this.artist}/>

        <PlayerPrevious onPrevious={playerStore.previous.bind(playerStore)} disabled={!playerStore.hasPrevious()}/>
        <PlayerControl onPlay={this.props.onPlay} playing={playerStore.playing} loading={playerStore.loading}/>
        <PlayerNext onPlay={playerStore.next.bind(playerStore)} disabled={!playerStore.hasNext()}/>
      </div>
    )
  }
}
