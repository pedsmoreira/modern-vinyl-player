import React from "react";

import {Image} from "react-bootstrap";

import Loader from "../Loader"

import "./ArtistCover.scss";

export default class ArtistCover extends React.Component {
    render() {
        if (!this.props.artist) return <Loader text="Artist Cover"/>

        return (
            <Image className="artist-cover" src={this.props.artist.cover} alt={this.props.artist.name + ' Cover'}
                   responsive circle/>
        )
    }
}
