import React from "react";

import Track from "./Track";
import Loader from "../Loader";

import "./TrackList.scss";

export default class TrackList extends React.Component {
  render() {
    if (!this.props.tracks) return <Loader text="Tracks"/>

    let map = this.props.tracks.map(track => (
      <Track key={track.id}
             track={track}
             playing={track === this.props.track && this.props.playing}
             loading={this.props.loading}
             onPlay={this.props.onPlay}
             onPause={this.props.onPause}/>
    ))

    return <div className="track-list">{map}</div>
  }
}
