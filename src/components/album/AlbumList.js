import React from 'react'

import Album from './Album'
import Loader from '../Loader'

import './AlbumList.scss'

export default class AlbumList extends React.Component {
  render() {
    if (!this.props.albums) return <Loader text="Albums"/>

    let map = this.props.albums.map(album =>
      <Album key={album.id} album={album} onPlay={this.props.onPlay} onPause={this.props.onPause}
             loading={this.props.loading} playing={this.props.playing && (this.props.track || {}).album_id === album.id}/>
    )

    return <div className="albumList">{map}</div>
  }
}
