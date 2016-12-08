import React from "react";
import "./PlayerDescriptionSong.scss";

export default class PlayerDescriptionSong extends React.Component {
  render() {
    if (this.props.song) {
      return (
        <div className="player-description-song">{this.props.song.name}</div>
      )
    }

    return null
  }
}
