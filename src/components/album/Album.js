import React from "react";

import {Image} from "react-bootstrap";
import {Link} from "react-router";

import Loader from "../Loader";

import "./Album.scss";

export default class Album extends React.Component {
  render() {
    if (!this.props.album) return <Loader text="Album"/>

    return <Link to={'/albums/' + this.props.album.id} className="album animated fadeIn">
      <Image className="album_cover" src={this.props.album.cover} alt={this.props.album.name + ' Cover'}/>
      <div className="album_name">{this.props.album.name}</div>
    </Link>
  }
}
