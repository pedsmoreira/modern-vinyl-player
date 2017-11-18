// @flow

import { observer } from "mobx-react";
import React from "react";

import Album from "models/Album";
import AlbumCard from "components/AlbumCard";

import "./AlbumCardGrid.scss";

type Props = {
  albums: Album[]
};

@observer
export default class AlbumCardGrid extends React.Component<Props> {
  render() {
    return (
      <div className="AlbumCardGrid">
        <div className="row">
          {this.props.albums.map(album => (
            <div key={album.key} className="col-lg-4 col-sm-6 col-6">
              <AlbumCard album={album} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
