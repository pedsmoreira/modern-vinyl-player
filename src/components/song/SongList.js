import React from 'react'

import Album from './Song'
import Loader from '../Loader'

export default class SongList extends React.Component {
  render() {
    if (!this.props.songs) return <Loader/>

    let map = this.props.songs.map(album =>
      <div>
        <Album album={album}/>
      </div>
    )

    return <div className='albumList'>{map}</div>
  }
}
