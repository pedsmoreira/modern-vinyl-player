import * as React from "react";

import PlayerDescriptionTrack from './descriptions/PlayerDescriptionTrack'
import PlayerDescriptionAlbum from './descriptions/PlayerDescriptionAlbum'
import PlayerDescriptionArtist from './descriptions/PlayerDescriptionArtist'

export default class PlayerDescription extends React.Component {
  render() {
    return (
      <div>
        <PlayerDescriptionTrack track={this.props.track}/>
        <span> - by </span>
        <PlayerDescriptionArtist artist={this.props.artist}/>
        <PlayerDescriptionAlbum album={this.props.album}/>
      </div>
    )
  }
}
