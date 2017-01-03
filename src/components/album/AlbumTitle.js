import React from "react";

import Loader from "../Loader"

export default class AlbumTitle extends React.Component {
    render() {
        if (!this.props.album) return <Loader text="Album"/>

        return (
            <header className="album-title">
                <h2>
                    {this.props.album.name}
                    <small> ({this.props.album.year})</small>
                </h2>
            </header>
        )
    }
}
