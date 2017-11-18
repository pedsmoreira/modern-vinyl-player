// @flow

import { observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";

import Album from "models/Album";
import AlbumCover from "components/AlbumCover";

import "./AlbumCard.scss";

type Props = {
  album: Album
};

@observer
export default class AlbumCard extends React.Component<Props> {
  render() {
    const album = this.props.album;
    const url = `/albums/${album.slug}`;

    return (
      <div className="AlbumCard card card-hover">
        <div className="AlbumCard__image">
          <Link to={url}>
            <AlbumCover album={album} className="card-img-top" />
          </Link>

          <button type="button" className="AlbumCard__play">
            <i className="fa fa-play AlbumCard__play-icon" />
          </button>
        </div>

        <Link to={url}>
          <h1 className="AlbumCard__name">{album.name}</h1>
        </Link>
      </div>
    );
  }
}
