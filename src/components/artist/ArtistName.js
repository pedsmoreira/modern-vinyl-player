import React from "react";

import {Link} from "react-router";

import Loader from "../Loader";

import "./ArtistName.scss";

export default class ArtistName extends React.Component {
    render() {
        if (this.props.artist) {
            return (
                <Link className="artist-name" to={`/artists/${this.props.artist.slug}`}>
                    {this.props.artist.name}
                </Link>
            )
        }

        return <Loader text="Artist"/>
    }
}
