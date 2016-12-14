import React from "react";

import {Link} from "react-router";

import Loader from "../Loader";
import AlbumCover from "./AlbumCover";

import PlayerControl from "../player/PlayerControl";

import "./Album.scss";

export default class Album extends React.Component {
  render() {
    if (!this.props.album) return <Loader text="Album"/>

    let classNames = ['album', 'animated', 'fadeIn']

    if (this.props.selected) {
      classNames.push('album--selected')
    }

    return (
      <div className={classNames.join(' ')}>
        <Link to={'/albums/' + this.props.album.slug} className="album_link">
          <AlbumCover album={this.props.album}/>
          <div className="album_name">{this.props.album.name}</div>
        </Link>

        <PlayerControl value={this.props.album} onPlay={this.props.onPlay} onPause={this.props.onPause}
                       selected={this.props.selected} playing={this.props.playing} loading={this.props.loading}/>
      </div>
    )
  }
}
