import React from 'react'
import {observer} from 'mobx-react'
import {observable} from 'mobx'

import {Grid, Row, Col} from 'react-bootstrap'

import Header from '../components/template/Header'
import Footer from '../components/template/Footer'
import Player from '../components/Player'
import PlaylistButton from '../components/playlist/PlaylistButton'

import playerStore from '../stores/playerStore'

import './AppView.css'

@observer
export default class AppView extends React.Component {
  /**
   * @type Album
   */
  @observable
  album

  /**
   * @type Artist
   */
  @observable
  artist

  componentWillUpdate() {
    if (playerStore.song && !this.album) {
      playerStore.song.album().then(album => {
        this.album = album
        album.artist().then(artist => this.artist = artist)
      })
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Header/>

        <Grid>
          <Row>
            <Col sm={4} className="text-center">
              <Player song={playerStore.song}
                      album={this.album}
                      artist={this.artist}
                      playing={playerStore.playing}
                      autoplay={playerStore.autoplay}
                      onPlay={playerStore.play.bind(playerStore)}
                      onPause={playerStore.pause.bind(playerStore)}
                      onEnd={playerStore.next.bind(playerStore)}
              />
            </Col>

            <Col sm={8}>{this.props.children}</Col>
          </Row>
        </Grid>

        <Footer/>
      </div>
    )
  }
}
