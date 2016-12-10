import React from "react";
import {Icon} from "react-fa";

import "./Track.scss";

export default class Track extends React.Component {
  render() {
    return <div className="track" onClick={() => this.props.toggle(this.props.track)}>
      {this.renderIcon()}

      {this.props.track.number + '. '}
      {this.props.track.name}

      <Icon className="track_add-icon" name="plus"/>
    </div>
  }

  renderIcon() {
    if (this.props.active) {
      return <Icon className="track_play-icon" name="pause"/>
    }

    return <Icon className="track_pause-icon" name="play"/>
  }
}
