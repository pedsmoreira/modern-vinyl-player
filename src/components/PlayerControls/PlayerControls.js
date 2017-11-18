// @flow

import { observer } from "mobx-react";
import React from "react";

import playerStore from "stores/playerStore";
import PlayButton from "components/PlayButton";

import "./PlayerControls.scss";

@observer
export default class PlayerControls extends React.Component<*> {
  render() {
    return (
      <div className="PlayerControls">
        <button
          className="PlayerControls__button"
          onClick={playerStore.playPrevious}
          disabled={!playerStore.hasPrevious}
        >
          <i className="fa fa-step-backward" />
        </button>

        <PlayButton />

        <button className="PlayerControls__button" onClick={playerStore.playNext} disabled={!playerStore.hasNext}>
          <i className="fa fa-step-forward" />
        </button>
      </div>
    );
  }
}
