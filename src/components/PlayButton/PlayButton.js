// @flow

import React from "react";
import { observer } from "mobx-react";

import playerStore from "stores/playerStore";
import PlayIcon from "components/PlayIcon/PlayIcon";

import "./PlayButton.scss";

@observer
export default class PlayButton extends React.Component<Props> {
  handleClick = () => {
    playerStore.toggle();
  };

  render() {
    // $FlowFixMe
    const track: Track = playerStore.track;

    return (
      <button className="PlayButton" onClick={this.handleClick}>
        <PlayIcon track={track} />
      </button>
    );
  }
}
