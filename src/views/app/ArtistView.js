import React from 'react'
import {observer} from "mobx-react";
import {observable} from "mobx";

import Artist from "../../models/Artist";
import Album from "../../models/Album";

import playerStore from "../../stores/playerStore";

import {Grid, Row, Col} from "react-bootstrap";

import Background from "../../components/Background";
import ArtistCover from "../../components/artist/ArtistCover";
import ArtistName from "../../components/artist/ArtistName";
import ArtistDescription from "../../components/artist/ArtistDescription";
import AlbumList from "../../components/album/AlbumList";

@observer
export default class ArtistView extends React.Component {
  @observable
  artist

  @observable
  albums

  componentWillMount() {
    let artist = this.props.params.artist

    Artist.find(artist).then(artist => this.artist = artist)
    Album.byArtist(artist).then(albums => this.albums = albums)
  }

  render() {
    return (
      <div className="artist-view animated fadeIn">
        <Background image={(this.artist || {}).background}/>

        <Grid>
          <Row>
            <Col md={3}>
              <ArtistCover artist={this.artist}/>
              <ArtistDescription artist={this.artist}/>
            </Col>

            <Col md={9}>
              <AlbumList albums={this.albums}
                         track={playerStore.track}
                         playing={playerStore.playing}
                         loading={playerStore.loading}
                         onPlay={playerStore.play.bind(playerStore)}
                         onPause={playerStore.pause.bind(playerStore)}/>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
