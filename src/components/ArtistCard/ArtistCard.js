// @flow

import { observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";

import Artist from "models/Artist";

import "./ArtistCard.scss";

type Props = {
  artist: Artist
};

@observer
export default class ArtistCard extends React.Component<Props> {
  render() {
    const artist = this.props.artist;
    const url = `/artists/${artist.slug}`;

    const maxCharacters = 100;
    const description =
      artist.description.length > maxCharacters
        ? artist.description.substring(0, maxCharacters - 3) + "..."
        : artist.description;

    return (
      <Link to={url} className="ArtistCard card card-hover">
        <div className="row">
          <div className="col-md-6">
            <img src={artist.cover} alt={`${artist.name} cover`} className="card-img-top" />
          </div>

          <div className="col-md-6">
            <div className="card-body">
              <h4 className="ArtistCard__name">{artist.name}</h4>
              <p className="ArtistCard__description">{description}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
