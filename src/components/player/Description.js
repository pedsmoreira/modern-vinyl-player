import * as React from 'react'
import {Link} from 'react-router'

export default class DescriptionComponent extends React.Component {
  render() {
    return (
      <div>
        <Link to={'/album/' + this.props.song.album.name}>
          {this.props.song.album.name}
        </Link>

        <Link to={'/artist/' + this.props.song.album.artist.name}>
          {this.props.song.album.artist.name}
        </Link>

        <div>{this.props.song.album.year}</div>
      </div>
    )
  }
}
