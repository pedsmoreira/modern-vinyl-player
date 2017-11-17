// @flow

import { observer } from "mobx-react";
import React from "react";

import Track from "models/Track";
import playerStore from "stores/playerStore";

import PlayIcon from "components/PlayIcon/PlayIcon";

import "./TrackItem.scss";

type Props = {
  track: Track
};

@observer
export default class TrackItem extends React.Component<Props> {
  handleClick = () => {
    if (!this.props.track.invalid) {
      playerStore.toggleTrack(this.props.track);
    }
  };

  render() {
    const track = this.props.track;

    const classes = ["TrackItem"];

    if (track.invalid) {
      classes.push("TrackItem--invalid");
      classes.push("text-danger");
    } else if (track === playerStore.track) {
      classes.push("TrackItem--active");
    }

    return (
      <button type="button" className={classes.join(" ")} onClick={this.handleClick}>
        <PlayIcon track={this.props.track} />

        <span className="TrackItem__number">{track.number}. </span>
        <span className="TrackItem_name">{track.name}</span>

        {track.invalid && (
          <small>
            <i> (Broken link)</i>
          </small>
        )}
      </button>
    );
  }
}
