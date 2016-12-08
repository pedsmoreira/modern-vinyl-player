import React from "react";

import {Button} from "react-bootstrap";
import {Icon} from 'react-fa'

export default class PlayerControlPlay extends React.Component {
  render() {
    if (!this.props.playing) {
      return (
        <Button bsStyle='link' onClick={this.props.onPlay} disabled={!this.props.song}>
          <Icon name="play"/>
        </Button>
      )
    }

    return null
  }
}
