import React from "react";

import Loader from "../Loader";

import "./AlbumDescription.scss"

export default class AlbumCover extends React.Component {
    render() {
        if (!this.props.album) return <Loader text="Album Description"/>

        return (
            <div className="album-description">{this.props.album.description}</div>
        )
    }
}
