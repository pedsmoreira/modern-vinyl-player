import React from "react";
import {observer} from "mobx-react";
import {observable} from "mobx";

import Album from "../../models/Album";

import playerStore from "../../stores/playerStore";

import {Grid} from "react-bootstrap";

import AlbumList from "../../components/album/AlbumList";
import Background from "../../components/Background"

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
        <Background
          image="http://3.bp.blogspot.com/-azDlYQ6E3eg/UiAZN9koBSI/AAAAAAAAJ_s/wUaI7wtcPvg/s1600/Background-Vinyl6.jpg"/>

        <Grid>
          <AlbumList albums={this.albums}
                     track={playerStore.track}
                     playing={playerStore.playing}
                     loading={playerStore.loading}
                     onPlay={playerStore.play.bind(playerStore)}
                     onPause={playerStore.pause.bind(playerStore)}/>
        </Grid>
      </div>
    )
  }
}
