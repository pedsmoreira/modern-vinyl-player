import React from 'react'

import Youtube from 'react-youtube'

export default class PlayerAudio extends React.Component {
  target

  componentWillReceiveProps(props) {
    if (!props.track) {
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
        autoplay: this.props.playing ? 1 : 0
      }
    }
  }

  onStateChange(event) {
    console.log(this.event);
    if(this.target !== event.target) {
      this.target = event.target
      this.target.setVolume(100)
      this.target.setPlaybackQuality('small')
    }
  }

  render() {
    // The player starts with a 1s blank video to fix an issue on Android, which causes the first Youtube iframe
    // to require the user to click again to play the video
    return (
      <div className="hidden">
        <Youtube videoId={this.props.track ? this.props.track.src : 'GbWFlg_bc9s'}
                 onStateChange={this.onStateChange.bind(this)}
                 onPlay={() => this.props.onPlay()}
                 onPause={() => this.props.onPause()}
                 onEnd={() => this.props.onEnd()}
                 opts={this.options()}/>
      </div>
    )
  }
}
