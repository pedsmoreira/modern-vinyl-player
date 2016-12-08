import * as React from 'react'

import Play from './controls/Play'
import Pause from './controls/Pause'

import "./Controls.css"

export default class Controls extends React.Component {
  render() {
    return (
      <div className="player-controls">
        <Play/>
        <Pause/>
      </div>
    )
  }
}
