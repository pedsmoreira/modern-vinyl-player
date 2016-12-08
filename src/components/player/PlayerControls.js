import * as React from 'react'

import PlayerControlPlay from './controls/PlayerControlPlay'
import PlayerControlPause from './controls/PlayerControlPause'

import "./PlayerControls.scss"

export default class PlayerControls extends React.Component {
  render() {
    return (
      <div className="player-controls">
        <PlayerControlPlay
          onPlay={this.props.onPlay}
          playing={this.props.playing}
          song={this.props.song}
        />

        <PlayerControlPause onPause={this.props.onPause} playing={this.props.playing}/>
      </div>
    )
  }
}
