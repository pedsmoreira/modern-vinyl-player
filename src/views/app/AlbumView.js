import React from "react";
import {observer} from "mobx-react";
import {observable} from "mobx";

import {Row, Col} from "react-bootstrap";

import playerStore from '../../stores/playerStore'

import AlbumModel from "../../models/Album";
import SongModel from '../../models/Song'

import Album from "../../components/album/Album";
import SongList from "../../components/song/SongList";

import "./AlbumView.scss";

@observer
export default class AlbumView extends React.Component {
  @observable album
  @observable songs

  componentWillMount() {
    let album = this.props.params.album

    Promise.all([
      AlbumModel.find(album),
      SongModel.byAlbum(album)
    ]).then(values => {
      this.album = values[0]
      this.songs = values[1]
    })
  }

  render() {
    return (
      <Row className="animated fadeInUp">
        <Col sm={3}>
          <Album album={this.album}/>
        </Col>

        <Col sm={9}>
          {this.album ?
            <header>
              <h2 className="album-view_title">
                {this.album.name} <small>({this.album.year})</small>
              </h2>
            </header>
            : null}

          <SongList songs={this.songs}
                    song={playerStore.song}
                    playing={playerStore.playing}
                    toggle={playerStore.toggle.bind(playerStore)}/>
        </Col>
      </Row>
    )
  }
}
