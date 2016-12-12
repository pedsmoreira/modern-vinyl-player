import React from "react";

import {Icon} from "react-fa";
import {Button} from "react-bootstrap";

import "./PlayerPrevious.scss";

export default class PlayerPrevious extends React.Component {
  render() {
    if(!this.props.track) return null

    return (
      <Button bsStyle="link" className="player-previous" onClick={() => {
        this.props.onPlay(this.props.track)
      }}>
        <Icon name="step-backward"/>
      </Button>
    )
  }
}
