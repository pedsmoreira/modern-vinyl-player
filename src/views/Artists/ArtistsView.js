// @flow

import * as React from "react";
import { observer } from "mobx-react";
import { action, observable } from "mobx";

import Artist from "models/Artist";
import ArtistCard from "components/ArtistCard";
import Loader from "components/Loader/Loader";

import "./ArtistsView.scss";

type Props = {};

@observer
export default class ArtistsView extends React.Component<Props> {
  @observable artists: Artist[];

  @action
  setArtists(artists: Artist[]) {
    this.artists = artists;
  }

  componentWillMount() {
    Artist.all().then(artists => this.setArtists(artists));
  }

  render() {
    return (
      <div className="ArtistsView animated fadeIn">
        <Loader for={this.artists} render={this.renderArtists} />
      </div>
    );
  }

  renderArtists = () => {
    const artists = this.artists.map(artist => (
      <div key={artist.key} className="col-md-6">
        <ArtistCard artist={artist} />
      </div>
    ));

    return <div className="row">{artists}</div>;
  };
}
