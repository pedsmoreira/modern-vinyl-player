// @flow

import React from "react";
import { observer } from "mobx-react";

import Track from "models/Track";
import playerStore from "stores/playerStore";
import PlayIcon from "components/PlayIcon";

import "./PlayButton.scss";

@observer
export default class PlayButton extends React.Component<*> {
  handleClick = () => {
    playerStore.toggle();
  };

  render() {
    const track: Track = playerStore.track;

    return (
      <button className="PlayButton" onClick={this.handleClick}>
        <PlayIcon track={track} />
      </button>
    );
  }
}
