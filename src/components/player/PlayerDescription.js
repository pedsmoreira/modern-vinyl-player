import * as React from "react";

import {Link} from "react-router";
import {Icon} from "react-fa";

import Loader from "../Loader";

import "./PlayerDescription.scss";

export default class PlayerDescription extends React.Component {
  render() {
    return (
      <div className="player-description">
        {this.content()}
      </div>
    )
  }

  content() {
    if (!this.props.track && !this.props.album) {
      return <div className="player-description_select">
        <Icon name="music"/> Select a track or album
      </div>
    } else if (!this.props.track) {
      return <Loader text="Track"/>
    }

    return (
      <Link to="/player">
        <div className="player-description_track">{this.props.track.name}</div>
        <div className="player-description_album">
          {this.props.album ? this.props.album.name : <Loader text="Album"/>}
        </div>
      </Link>
    )
  }
}
