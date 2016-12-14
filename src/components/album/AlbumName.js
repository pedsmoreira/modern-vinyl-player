import React from "react";

import {Link} from "react-router";

import Loader from "../Loader";

import "./AlbumName.scss";

export default class AlbumName extends React.Component {
  render() {
    if (!this.props.album) return <Loader text="Album"/>

    return (
      <Link to={`/albums/${this.props.album.slug}`} className="album-name">
        {this.props.album.name}
      </Link>
    )
  }
}
