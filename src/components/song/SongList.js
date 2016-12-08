import React from "react";

import Song from "./Song";
import Loader from "../Loader";

import "./SongList.scss";

export default class SongList extends React.Component {
  render() {
    if (!this.props.songs) return <Loader/>

    let map = this.props.songs.map(song => (
      <Song key={song.id}
            song={song}
            active={song === this.props.song && this.props.playing}
            toggle={this.props.toggle}/>
    ))

    return <div className="song-list">{map}</div>
  }
}
