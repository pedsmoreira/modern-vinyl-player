// @flow

import * as React from "react";
import { observer } from "mobx-react";
import { action, observable } from "mobx";

import Album from "models/Album";
import AlbumCard from "components/AlbumCard";
import Loader from "components/Loader/Loader";

import "./AlbumsView.scss";

type Props = {};

@observer
export default class AlbumsView extends React.Component<Props> {
  @observable albums: Album[];

  @action
  setAlbums(albums: Album[]) {
    this.albums = albums;
  }

  componentWillMount() {
    Album.all().then(albums => this.setAlbums(albums));
  }

  render() {
    return (
      <div className="AlbumsView">
        <Loader for={this.albums} render={this.renderAlbums} />
      </div>
    );
  }

  renderAlbums = () => {
    const albums = this.albums.map(album => (
      <div key={album.key} className="col-md-4">
        <AlbumCard album={album} />
      </div>
    ));

    return <div className="row">{albums}</div>;
  };
}
