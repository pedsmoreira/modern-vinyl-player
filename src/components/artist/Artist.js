import React from "react";

import {Link} from "react-router";

import Loader from "../Loader";
import ArtistCover from "./ArtistCover";

import "./Artist.scss";

export default class Artist extends React.Component {
  render() {
    if (!this.props.artist) return <Loader text="Artist"/>

    return (
      <Link className="artist" to={`/artists/${this.props.artist.id}`}>
        <ArtistCover artist={this.props.artist}/>
        {this.props.artist.name}
      </Link>
    )
  }
}
