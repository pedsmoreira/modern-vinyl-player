import React from 'react'
import {Button} from 'react-bootstrap'

export default class Pause extends React.Component {
  render() {
    return (
      <Button bsStyle="primary" onClick={this.props.pause}>Pause</Button>
    )
  }
}
