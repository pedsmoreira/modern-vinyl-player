import * as React from 'react'
import {observer} from 'mobx-react'

import {Row, Col} from 'react-bootstrap'

import PlayerDisc from './player/PlayerDisc'
import PlayerDescription from './player/PlayerDescription'
import PlayerControls from './player/PlayerControls'
import PlayerAudio from './player/PlayerAudio'

import "./Player.scss"

@observer
export default class Player extends React.Component {
  render() {
    return (
      <Row className="player">
        <Col xs={5} sm={12}>
          <PlayerDisc album={this.props.album} playing={this.props.playing}/>
        </Col>

        <Col xs={7} sm={12}>
          <PlayerDescription album={this.props.album}
                             song={this.props.song}
                             artist={this.props.artist}/>

          <PlayerControls playing={this.props.playing}
                          onPlay={this.props.onPlay}
                          onPause={this.props.onPause}
                          song={this.props.song}/>

          <PlayerAudio song={this.props.song}
                       autoplay={this.props.autoplay}
                       playing={this.props.playing}
                       onPlay={this.props.onPlay}
                       onPause={this.props.onPause}
                       onEnd={this.props.onEnd}/>
        </Col>
      </Row>
    )
  }
}
