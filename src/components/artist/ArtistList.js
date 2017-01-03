import React from "react";

import Loader from "../Loader";
import Artist from "./Artist";

import "./ArtistList.scss";

export default class ArtistList extends React.Component {
    render() {
        if (!this.props.artists) return <Loader text="Artists"/>

        let map = this.props.artists.map(artist =>
            <Artist key={artist.id} artist={artist}/>
        )

        return <div className="artist-list">{map}</div>
    }
}
