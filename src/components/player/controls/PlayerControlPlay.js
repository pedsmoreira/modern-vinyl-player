import React from "react";
import {Button} from "react-bootstrap";

import playerStore from "../../../stores/playerStore";

export default class Play extends React.Component {
  render() {
    return (
      <Button bsStyle='primary' onClick={playerStore.play()}>
        Play
      </Button>
    )
  }
}
