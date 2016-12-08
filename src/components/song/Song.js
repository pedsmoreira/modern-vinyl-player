import React from "react";
import {Icon} from "react-fa";

import "./Song.scss";

export default class Song extends React.Component {
  render() {
    return <div className="song" onClick={() => this.props.toggle(this.props.song)}>
      {this.renderIcon()}
      {this.props.song.name}

      <Icon className="song_add-icon" name="plus"/>
    </div>
  }

  renderIcon() {
    if (this.props.active) {
      return <Icon className="song_play-icon" name="pause"/>
    }

    return <Icon className="song_pause-icon" name="play"/>
  }
}
