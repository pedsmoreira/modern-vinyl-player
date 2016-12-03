import React from "react";
import {Button} from 'react-bootstrap'

export default class Play extends React.Component {
  render() {
    return (
      <Button bsStyle='primary' onClick={this.props.play}>
        Play
      </Button>
    )
  }
}
