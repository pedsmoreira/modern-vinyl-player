import * as React from 'react'

import Disc from './player/Disc'
import Description from './player/Description'
import Controls from './player/Controls'

export default class Player extends React.Component {
  render() {
    return (
      <div>
        <Disc player={this.props.player}/>
        <Description song={this.props.player.song}/>
        <Controls play={this.props.play} pause={this.props.pause}/>
      </div>
    )
  }
}
