import * as React from "react";

import {Icon} from "react-fa";

import Loader from "../Loader";
import PlayerDescriptionTrack from "./descriptions/PlayerDescriptionTrack";
import PlayerDescriptionAlbum from "./descriptions/PlayerDescriptionAlbum";

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
    } else if (!this.props.track || !this.props.album) {
      return <Loader text="Track"/>
    }

    return (
      <div className="player-description_playing">
        <PlayerDescriptionTrack track={this.props.track}/>
        <PlayerDescriptionAlbum album={this.props.album}/>
      </div>
    )
  }
}
