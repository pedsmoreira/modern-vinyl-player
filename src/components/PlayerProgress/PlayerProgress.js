// @flow

import { observer } from "mobx-react";
import React from "react";

import playerStore from "stores/playerStore";

import "./PlayerProgress.scss";

@observer
export default class PlayerProgress extends React.Component<*> {
  container: ?HTMLDivElement;

  get filledPercentage(): number {
    const duration = playerStore.duration;
    if (!duration) return 0;

    return playerStore.progress * 100 / duration;
  }

  getProgressFromMouseEvent(event: SyntheticMouseEvent<>): number {
    const container = this.container;
    if (!container) return 0;

    const distance = event.pageX - container.getBoundingClientRect().left;
    return playerStore.duration * distance / container.offsetWidth;
  }

  handleClick = (event: SyntheticMouseEvent<HTMLDivElement>) => {
    const time = this.getProgressFromMouseEvent(event);
    playerStore.seekTo(time);
  };

  render() {
    return (
      <div ref={el => (this.container = el)} className="PlayerProgress" onClick={this.handleClick}>
        <div className="PlayerProgress__fill" style={{ width: `${this.filledPercentage}%` }} />
      </div>
    );
  }
}
