import React from "react";
import {observer} from "mobx-react";
import {observable} from "mobx";

import Album from "../../models/Album";

import {Grid} from "react-bootstrap";

import AlbumList from "../../components/album/AlbumList";

import "./AlbumsView.scss";

@observer
export default class AlbumsView extends React.Component {
  @observable albums

  componentWillMount() {
    Album.all().then(albums => this.albums = albums)
  }

  render() {
    return (
      <div className="albums-view animated fadeIn">
        <div className="albums-view_cover"/>

        <Grid>
          <AlbumList albums={this.albums}/>
        </Grid>
      </div>
    )
  }
}
