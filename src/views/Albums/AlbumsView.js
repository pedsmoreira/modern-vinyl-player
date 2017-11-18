// @flow

import { action, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

import Album from "models/Album";
import Loader from "components/Loader/Loader";
import AlbumCardGrid from "components/AlbumCardGrid/AlbumCardGrid";

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
      <div className="AlbumsView animated fadeIn">
        <Loader for={this.albums} render={this.renderContent} />
      </div>
    );
  }

  renderContent = () => {
    return <AlbumCardGrid albums={this.albums} />;
  };
}
