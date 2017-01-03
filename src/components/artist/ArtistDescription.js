import React from "react";

import Loader from "../Loader";

import "./ArtistDescription.scss"

export default class ArtistCover extends React.Component {
    render() {
        if (!this.props.artist) return <Loader text="Artist Description"/>

        return (
            <div className="artist-description">{this.props.artist.description}</div>
        )
    }
}
