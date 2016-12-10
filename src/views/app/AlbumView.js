import React from "react";
import {observer} from "mobx-react";
import {observable} from "mobx";

import {Grid, Row, Col} from "react-bootstrap";

import playerStore from '../../stores/playerStore'

import AlbumModel from "../../models/Album";
import TrackModel from '../../models/Track'
import ArtistModel from '../../models/Artist'

import Album from "../../components/album/Album";
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

    AlbumModel.find(album).then(album => this.album = album)
    TrackModel.byAlbum(album).then(tracks => this.tracks = tracks)
    ArtistModel.byAlbum(album).then(artist => this.artist = artist)
  }

  render() {
    return (
      <div className="album-view animated fadeIn">
        <div className="album-view_cover"
             style={!this.album ? {} : {backgroundImage: `url('${this.album.background}')`}}/>

        <Grid className="animated slideInUp album-view">
          <Row>
            <Col sm={9}>
              <div style={{background: 'rgba(0, 0, 0, .25', padding: '2rem'}}>
                <ArtistName artist={this.artist}/>
                {this.album ?
                  <header>
                    <h2 className="album-view_title">
                      {this.album.name}
                      <small> ({this.album.year})</small>
                    </h2>
                  </header>
                  : null}

                <TrackList tracks={this.tracks}
                           track={playerStore.track}
                           playing={playerStore.playing}
                           toggle={playerStore.toggle.bind(playerStore)}/>
              </div>
            </Col>

            <Col sm={3} style={{background: 'rgba(0, 0, 0, .25)'}} xsHidden>
              <br/>
              <Album album={this.album}/>

              <br/>

              <p>{!this.album ? null : this.album.description}</p>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
