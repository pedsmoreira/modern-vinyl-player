// @flow

import { observer } from "mobx-react";
import React from "react";

import Track from "models/Track";
import playerStore from "stores/playerStore";

type Props = {
  track: ?Track
};

@observer
export default class PlayIcon extends React.Component<Props> {
  get icon(): string {
    if (this.props.track.invalid) return "exclamation-triangle";

    if (this.props.track !== playerStore.track || (this.props.track === playerStore.track && playerStore.isPaused)) {
      return "play";
    }

    return playerStore.isPlaying ? "pause" : "spinner fa-pulse";
  }

  render() {
    return <i className={`PlayIcon fa fa-${this.icon}`} />;
  }
}
