import React from "react";
import "./PlayerDescriptionTrack.scss";

export default class PlayerDescriptionTrack extends React.Component {
  render() {
    if (this.props.track) {
      return (
        <span className="player-description-track">{this.props.track.name}</span>
      )
    }

    return null
  }
}
