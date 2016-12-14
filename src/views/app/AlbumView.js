import React from "react";
import {observer} from "mobx-react";
import {observable} from "mobx";

import {Grid, Row, Col} from "react-bootstrap";

import playerStore from "../../stores/playerStore";

import Album from "../../models/Album";
import Track from '../../models/Track'
import Artist from '../../models/Artist'

import Background from "../../components/Background";
import AlbumTitle from "../../components/album/AlbumTitle";
import AlbumCover from "../../components/album/AlbumCover";
import AlbumDescription from "../../components/album/AlbumDescription";
import TrackList from "../../components/track/TrackList";
import ArtistName from "../../components/artist/ArtistName";

import "./AlbumView.scss";

@observer
export default class AlbumView extends React.Component {
  @observable artist
  @observable album
  @observable tracks

  componentWillMount() {
    let album = this.props.params.album

    Album.find(album).then(album => this.album = album)
    Track.byAlbum(album).then(tracks => this.tracks = tracks)
    Artist.byAlbum(album).then(artist => this.artist = artist)
  }

  render() {
    return (
      <div className="album-view animated fadeIn">
        <Background image={(this.album || {}).background}/>

        <Grid className="animated slideInUp album-view">
          <Row>
            <Col sm={9}>
              <div className="album-view_tracks">
                <ArtistName artist={this.artist}/>
                <AlbumTitle album={this.album}/>

                <TrackList tracks={this.tracks}
                           track={playerStore.track}
                           playing={playerStore.playing}
                           loading={playerStore.loading}
                           inPlaylist={playerStore.inPlaylist.bind(playerStore)}
                           onPlay={playerStore.play.bind(playerStore)}
                           onPause={playerStore.pause.bind(playerStore)}
                           onAdd={playerStore.add.bind(playerStore)}/>
              </div>
            </Col>

            <Col sm={3} xsHidden className="album-view_description">
              <AlbumCover album={this.album}/>
              <AlbumDescription album={this.album}/>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
