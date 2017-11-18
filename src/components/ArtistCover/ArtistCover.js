// @flow

import React from "react";
import { observer } from "mobx-react";
import ProgressiveImage from "react-progressive-image";

import Artist from "models/Artist";

type Props = {
  artist: ?Artist
};

@observer
export default class ArtistCover extends React.Component<Props> {
  render() {
    const { artist, ...props } = this.props;

    return (
      <ProgressiveImage src={(artist || {}).cover} placeholder="http://placehold.it/320?text=Artist Cover">
        {src => <img src={src} alt={`${(artist || {}).name} cover`} className="ArtistCover" {...props} />}
      </ProgressiveImage>
    );
  }
}
