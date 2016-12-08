import React from "react";
import {Link} from "react-router";

export default class PlayerDescriptionArtist extends React.Component {
  render() {
    if (this.props.artist) {
      return (
        <Link to={`/artist/${this.props.artist.id}`} className="player-description-artist">
          {this.props.artist.name}
        </Link>
      )
    }

    return null
  }
}
