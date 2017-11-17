// @flow

import { observer } from "mobx-react";
import React from "react";

import Track from "models/Track";

import "./TrackItem.scss";

type Props = {
  track: Track
};

@observer
export default class TrackItem extends React.Component<Props> {
  render() {
    const track = this.props.track;

    return (
      <button type="button" className="TrackItem">
        <span className="TrackItem__icon">
          <i className="fa fa-play" />
        </span>

        <span className="TrackItem__number">{track.number}. </span>
        <span className="TrackItem_name">{track.name}</span>
      </button>
    );
  }
}
