import React from 'react'

import Youtube from 'react-youtube'

export default class PlayerAudio extends React.Component {
  target

  componentWillReceiveProps(props) {
    if (!props.song) {
      this.target = null
    }

    if (this.target) {
      let method = `${props.playing ? 'play' : 'pause'}Video`
      this.target[method]()
    }
  }

  options() {
    return {
      playerVars: {
        autoplay: this.props.autoplay ? 1 : 0
      }
    }
  }

  onReady(event) {
    this.target = event.target
    this.target.setVolume(100)
  }

  render() {
    if (this.props.song) {
      return (
        <div className="hidden">
          <Youtube ref="youtube" videoId={this.props.song.src}
                   onReady={this.onReady.bind(this)}
                   onPlay={this.props.onPlay}
                   onPause={this.props.onPause}
                   onEnd={this.props.onEnd}
                   opts={this.options()}/>
        </div>
      )
    }

    return null
  }
}