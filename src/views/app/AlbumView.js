import React from 'react'

import {Row} from 'react-bootstrap'

import Album from '../../components/album/Album'
import Song from '../../components/song/Song'

export default class AlbumView extends React.Component {
  componentWillMount() {
  }

  render() {
    return (
      <Row className="animated fadeInDown">
        { this.props.songs ? this.renderSongs() : this.renderSongsLoader() }
      </Row>
    )
  }

  renderAlbum() {
    return <Album album={this.props.album}/>
  }

  renderAlbumLoader() {
    return <div>Loading album</div>
  }

  renderSongs() {
    return <div>
      {
        this.props.songs.map((song) => {
          return <Song key={song.id} song={song}/>
        })
      }
    </div>
  }

  renderSongsLoader() {
    return <div>Loading Album</div>
  }
}
