import React from "react";

import {Icon} from "react-fa";
import {Button} from "react-bootstrap";

import "./PlayerAdd.scss";

export default class PlayerAdd extends React.Component {
  render() {
    return (
      <Button className="player-add" bsStyle="link" onClick={() => this.props.onAdd(this.props.track)}>
        <Icon className="track_add-icon" name="plus"/>
      </Button>
    )
  }
}
