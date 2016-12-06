import React from 'react'

export default class Song extends React.Component {
  render() {
    return <div>{this.props.song.name}</div>
  }
}
