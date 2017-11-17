// @flow

import React from "react";

import Album from "models/Album";

import "./AlbumCard.scss";

type Props = {
  album: Album
};

export default class AlbumCard extends React.Component<Props> {
  render() {
    const album = this.props.album;

    return (
      <a href={`/albums/${album.slug}`} className="AlbumCard card">
        <img src={album.cover} alt={`${album.name} cover`} className="card-img-top" />
        <div className="card-block">
          <div className="card-title">{album.name}</div>
          <div className="card-text">{album.description}</div>
        </div>
      </a>
    );
  }
}
