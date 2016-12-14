import React from "react";
import {observer} from "mobx-react";

import Track from "./Track";
import Loader from "../Loader";

import "./TrackList.scss";

@observer
export default class TrackList extends React.Component {
  onPlay(track) {
    this.props.onPlay(track, this.props.tracks)
  }

  render() {
    if (!this.props.tracks) return <Loader text="Tracks"/>

    let map = this.props.tracks.map(track => (
      <Track key={track.id}
             track={track}
             selected={(this.props.track || {}).id === track.id}
             playing={this.props.playing}
             loading={this.props.loading}
             onPlay={this.onPlay.bind(this)}
             onPause={this.props.onPause}
             onAdd={this.props.onAdd}
             hasAdd={!this.props.inPlaylist(track)}/>
    ))

    return <div className="track-list">{map}</div>
  }
}
