import React from "react";

import {Icon} from "react-fa";

import PlayerControl from "../player/PlayerControl";

import "./Track.scss";

export default class Track extends React.Component {
  onClick() {
    if (this.props.playing && this.props.selected) {
      this.props.onPause()
    } else {
      this.props.onPlay(this.props.track)
    }
  }

  render() {
    let classNames = ['track'];
    if(this.props.selected) {
      classNames.push('track--selected')
    }

    return <div className={classNames.join(' ')} onClick={this.onClick.bind(this)}>
      <PlayerControl onPlay={this.props.onPlay} onPause={this.props.onPause} value={this.props.track}
                     selected={this.props.selected} playing={this.props.playing}/>

      {this.props.track.number + '. '}
      {this.props.track.name}

      <Icon className="track_add-icon" name="plus"/>
    </div>
  }
}
