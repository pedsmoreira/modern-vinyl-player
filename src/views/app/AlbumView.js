import React from 'react'
import {observer} from 'mobx-react'
import {observable} from 'mobx'

import {Row, Col} from 'react-bootstrap'

import AlbumModel from '../../models/Album'

import Album from '../../components/album/Album'
import SongList from '../../components/song/SongList'

@observer
export default class AlbumView extends React.Component {
  @observable album
  @observable songs

  componentWillMount() {
    AlbumModel.find(this.props.params.album).then(album => this.album = album)
  }

  render() {
    return (
      <Row className="animated fadeIn">
        <Col sm={3}>
          <Album album={this.album}/>
        </Col>

        <Col>
        <SongList songs={this.songs}/>
        </Col>
      </Row>
    )
  }
}
