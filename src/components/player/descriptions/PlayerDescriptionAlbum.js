import React from "react";
import {Link} from "react-router";

import "./PlayerDescriptionAlbum.scss";

export default class PlayerDescriptionAlbum extends React.Component {
  render() {
    if (this.props.album) {
      return (
        <div className="player-description-album">
          <Link to={'/albums/' + this.props.album.slug}>
            {this.props.album.name}
            <small className="player-description-album_year">({this.props.album.year})</small>
          </Link>
        </div>
      )
    }

    return null
  }
}
