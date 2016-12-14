import React from "react";
import Youtube from "react-youtube";

import "./PlayerAudio.scss";

export default class PlayerAudio extends React.Component {
  target

  componentWillReceiveProps(props) {
    if (this.target) {
      let method = `${props.playing ? 'play' : 'pause'}Video`
      this.target[method]()
    }
  }

  options() {
    return {
      width: '0',
      height: '0',
      playerVars: {
        autoplay: (this.props.playing || !this.props.track) ? 1 : 0
      }

    }
  }

  onReady(event) {
    this.target = event.target

    if (this.target) {
      let method = `${(this.props.playing || !this.props.track) ? 'play' : 'pause'}Video`
      this.target[method]()
    }
  }

  onStateChange(event) {
    if (this.target !== event.target) {
      this.target = event.target
      this.target.setVolume(100)
      this.target.setPlaybackQuality('small')
    }

    if (event.data === Youtube.PlayerState.PLAYING) {
      this.props.onLoad()
    }
  }

  render() {
    // The player starts with a 1s blank video to fix an issue on Android, which causes the first Youtube iframe
    // to require the user to click again to play the video
    return (
      <div className="player-audio">
        <Youtube videoId={this.props.track ? this.props.track.src : 'GlCmAC4MHek'}
                 onReady={this.onReady.bind(this)}
                 onStateChange={this.onStateChange.bind(this)}
                 onEnd={() => this.props.onEnd()}
                 opts={this.options()}/>
      </div>
    )
  }
}
