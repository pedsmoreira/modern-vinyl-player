// @flow

import { observer } from "mobx-react";
import React from "react";
import Youtube from "react-youtube";

import playerStore from "stores/playerStore";

import "./Player.scss";

const YOUTUBE_OPTIONS = {
  width: 0,
  height: 0,
  playerVars: {
    autoplay: 1
  }
};

const UPDATE_PROGRESS_MILLISECONDS_INTERVAL = 500;

@observer
export default class Player extends React.Component<*> {
  video: any;

  componentWillMount() {
    playerStore.pauseDispatcher.listen(this.pauseVideo);
    playerStore.playDispatcher.listen(this.playVideo);
    playerStore.seekDispatcher.listen(this.seekTo);
    playerStore.volumeDispatcher.listen(this.setVolume);
  }

  pauseVideo = () => {
    this.video.pauseVideo();
  };

  playVideo = () => {
    if (this.video) {
      this.video.playVideo();
    }
  };

  seekTo = (time: number) => {
    if (this.video) {
      this.video.seekTo(time);
    }
  };

  setVolume = (volume: number) => {
    if (this.video) {
      this.video.setVolume(volume);
    }
  };

  handleIntervalUpdate = () => {
    if (!this.video) return;

    const duration = this.video.getDuration();
    if (playerStore.duration !== duration) {
      playerStore.onEmbedDuration(duration);
    }

    const time = this.video.getCurrentTime();
    if (playerStore.progress !== time) {
      playerStore.onEmbedProgress(time);
    }
  };

  bindTarget = ({ target }: any) => {
    this.video = target;
    this.video.setVolume(playerStore.volume);

    this.handleIntervalUpdate();
    setInterval(this.handleIntervalUpdate, UPDATE_PROGRESS_MILLISECONDS_INTERVAL);
  };

  render() {
    const track = playerStore.track;
    const videoId = (track || {}).src;

    return (
      <div className="Player">
        <Youtube
          videoId={videoId}
          opts={YOUTUBE_OPTIONS}
          onStateChange={playerStore.onEmbedStateChange}
          onEnd={playerStore.playNext}
          onError={playerStore.onEmbedError}
          onReady={this.bindTarget}
        />
      </div>
    );
  }
}
