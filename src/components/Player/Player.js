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

@observer
export default class Player extends React.Component<*> {
  render() {
    const track = playerStore.track;

    return (
      <div className="Player">
        <Youtube
          videoId={(track || {}).src}
          opts={YOUTUBE_OPTIONS}
          onStateChange={playerStore.onEmbedStateChange}
          onEnd={playerStore.next}
          onError={playerStore.onEmbedError}
        />
      </div>
    );
  }
}
