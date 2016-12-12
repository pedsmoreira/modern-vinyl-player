import React from "react";

import {Icon} from "react-fa";
import {Button} from "react-bootstrap";

import "./PlayerNext.scss";

export default class PlayerNext extends React.Component {
  render() {
    return (
      <Button className="player-next" onClick={this.props.onNext} {this.props.disabled ? 'disabled' : null}>
        <Icon name="step-forward"/>
      </Button>
    )
  }
}