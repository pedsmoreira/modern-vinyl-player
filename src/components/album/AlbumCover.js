import React from "react";

import {Image} from "react-bootstrap";

import Loader from "../Loader"

import "./AlbumCover.scss";

export default class AlbumCover extends React.Component {
  render() {
    if (!this.props.album) return <Loader text="Album Cover"/>

    return (
      <Image className="album-cover" src={this.props.album.cover} alt={this.props.album.name + ' Cover'} responsive/>
    )
  }
}
