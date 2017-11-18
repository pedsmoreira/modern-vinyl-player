// @flow

import { observer } from "mobx-react";
import { action, observable } from "mobx";
import * as React from "react";

import Album from "models/Album";
import Artist from "models/Artist";
import Loader from "components/Loader";
import AlbumCardGrid from "components/AlbumCardGrid";
import ArtistCover from "components/ArtistCover";

import "./ArtistView.scss";

type Props = {
  match: {
    params: {
      slug: string
    }
  }
};

@observer
export default class ArtistView extends React.Component<Props> {
  @observable artist: Artist;
  @observable albums: Album[];

  @action
  setValues({ artist, albums }: { artist: Artist, albums: Album[] }) {
    this.artist = artist;
    this.albums = albums;
  }

  componentWillMount() {
    const slug = this.props.match.params.slug;

    const artistPromise = Artist.find(slug);
    const albumPromise = Album.byArtist(slug);

    Promise.all([artistPromise, albumPromise]).then(([artist, albums]: any) => {
      this.setValues({ artist, albums });
    });
  }

  render() {
    return (
      <div className="ArtistView">
        <Loader for={this.artist && this.albums} render={this.renderContent} />
      </div>
    );
  }

  renderContent = () => {
    return (
      <div className="ArtistView animated fadeIn">
        <div className="header-card card">
          <div className="card-body">
            <ArtistCover artist={this.artist} className="header-card-image" />
            <h1 className="header-card-name">{this.artist.name}</h1>
            <p className="header-card-description">{this.artist.description}</p>
          </div>
        </div>

        <div className="ArtistView__albums">
          <AlbumCardGrid albums={this.albums} />
        </div>
      </div>
    );
  };
}
