import React from 'react'

import {Row, Col} from 'react-bootstrap'

import Album from './Album'
import Loader from '../Loader'

export default class AlbumList extends React.Component {
  render() {
    if (!this.props.albums) return <Loader/>

    let map = this.props.albums.map(album =>
      <Col key={album.id} md={3}>
        <Album album={album}/>
      </Col>
    )

    return <Row className='albumList'>{map}</Row>
  }
}
