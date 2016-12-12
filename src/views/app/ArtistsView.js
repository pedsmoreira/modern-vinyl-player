import React from 'react'
import {observer} from "mobx-react";
import {observable} from "mobx";

import Artist from "../../models/Artist";

import {Grid} from "react-bootstrap";

import Background from "../../components/Background";
import ArtistList from "../../components/artist/ArtistList";

@observer
export default class ArtistsView extends React.Component {
  @observable
  artists

  componentWillMount() {
    Artist.all().then(artists => this.artists = artists)
  }

  render() {
    return (
      <div className="artists-view animated fadeIn">
        <Background
          image="http://bighdwalls.com/wp-content/uploads/the-musician-hd-wallpaper.jpg"/>

        <Grid>
          <ArtistList artists={this.artists}/>
        </Grid>
      </div>
    )
  }
}
