// @flow

import { observer } from "mobx-react";
import { action, observable } from "mobx";
import * as React from "react";

import Track from "models/Track";
import Album from "models/Album";
import Artist from "models/Artist";

import AlbumCover from "components/AlbumCover/AlbumCover";
import ArtistMiniCard from "components/ArtistMiniCard/ArtistMiniCard";
import Loader from "components/Loader/Loader";
import TrackItem from "components/TrackItem/TrackItem";

import "./AlbumView.scss";

type Props = {
  match: {
    params: {
      slug: string
    }
  }
};

@observer
export default class AlbumView extends React.Component<Props> {
  @observable artist: Artist;
  @observable album: Album;
  @observable tracks: Track[];

  @action
  setValues({ artist, album, tracks }: { artist: Artist, album: Album, tracks: Track[] }) {
    this.artist = artist;
    this.album = album;
    this.tracks = tracks;
  }

  componentWillMount() {
    const slug = this.props.match.params.slug;

    const artistPromise = Artist.byAlbum(slug);
    const albumPromise = Album.find(slug);
    const tracksPromise = Track.byAlbum(slug);

    Promise.all([artistPromise, albumPromise, tracksPromise]).then(([artist, album, tracks]: any) => {
      this.setValues({ artist, album, tracks });
    });
  }

  render() {
    return (
      <div className="AlbumView">
        <Loader for={this.artist && this.album && this.tracks} render={this.renderContent} />
      </div>
    );
  }

  renderContent = () => {
    const album = this.album;

    return (
      <div>
        <div className="animated fadeInDown">
          <ArtistMiniCard artist={this.artist} />
        </div>

        <div className="card animated fadeIn">
          <div className="card-body">
            <div className="header-card clearfix">
              <AlbumCover album={album} className="header-card-image" />

              <h1 className="header-card-name">
                {album.name}
                <small>
                  <i> ({album.year})</i>
                </small>
              </h1>

              <p className="header-card-description">{album.description}</p>
            </div>

            <div className="AlbumView__tracks">
              {this.tracks.map(track => <TrackItem key={track.key} track={track} album={this.album} />)}
            </div>
          </div>
        </div>
      </div>
    );
  };
}
