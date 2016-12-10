import React from "react";

import Track from "./Track";
import Loader from "../Loader";

import "./TrackList.scss";

export default class TrackList extends React.Component {
  render() {
    if (!this.props.tracks) return <Loader/>

    let map = this.props.tracks.map(track => (
      <Track key={track.id}
            track={track}
            active={track === this.props.track && this.props.playing}
            toggle={this.props.toggle}/>
    ))

    return <div className="track-list">{map}</div>
  }
}
