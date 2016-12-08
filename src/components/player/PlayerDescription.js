import * as React from "react";

import PlayerDescriptionSong from './descriptions/PlayerDescriptionSong'
import PlayerDescriptionAlbum from './descriptions/PlayerDescriptionAlbum'
import PlayerDescriptionArtist from './descriptions/PlayerDescriptionArtist'

export default class PlayerDescription extends React.Component {
  render() {
    return (
      <div>
        <PlayerDescriptionSong song={this.props.song}/>
        <PlayerDescriptionAlbum album={this.props.album}/>
        <PlayerDescriptionArtist artist={this.props.artist}/>
      </div>
    )
  }
}
