import React from "react";

import {Button} from "react-bootstrap";
import {Icon} from "react-fa";

export default class PlayerControlPause extends React.Component {
  render() {
    if (this.props.playing) {
      return (
        <Button bsStyle="link" onClick={this.props.onPause}>
          <Icon name="pause"/>
        </Button>
      )
    }

    return null
  }
}
