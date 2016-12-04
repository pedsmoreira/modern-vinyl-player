import React from 'react'

import {Image} from 'react-bootstrap'
import {Link} from 'react-router'

import './Album.scss'

export default class Album extends React.Component {
  render() {
    return <Link to={'/album/' + this.props.album.id} className='album'>
      <Image src={this.props.album.cover} alt={this.props.album.name + ' Cover'} responsive/>
      <div className="album_name">{this.props.album.name}</div>
    </Link>
  }
}
