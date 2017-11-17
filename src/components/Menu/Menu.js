// @flow

import React from "react";
import { observer } from "mobx-react";

import playerStore from "stores/playerStore";
import Player from "components/Player/Player";

import "./Menu.scss";

@observer
export default class Menu extends React.Component<*> {
  render() {
    return <div className="Menu">{playerStore.track ? this.renderPlayer() : this.renderPlaceholder()}</div>;
  }

  renderPlaceholder() {
    return (
      <div>
        Select a <i className="fa fa-music" /> song to play
      </div>
    );
  }

  renderPlayer() {
    return (
      <div className="Menu__player">
        <Player />
        {/*<PlayerControls/>*/}
      </div>
    );
  }
}
