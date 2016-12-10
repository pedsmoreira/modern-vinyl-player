import React from 'react'

import Album from './Album'
import Loader from '../Loader'

import './AlbumList.scss'

export default class AlbumList extends React.Component {
  render() {
    if (!this.props.albums) return <Loader/>

    let map = this.props.albums.map(album =>
      <div key={album.id} style={{display: 'inline-block', margin: '1rem'}}>
        <Album album={album}/>
      </div>
    )

    return <div className="albumList text-center">{map}</div>
  }
}
