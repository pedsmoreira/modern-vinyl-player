// @flow

import React from "react";
import { observer } from "mobx-react";
import ProgressiveImage from "react-progressive-image";

import Album from "models/Album";

type Props = {
  album: ?Album
};

@observer
export default class AlbumCover extends React.Component<Props> {
  render() {
    const { album, ...props } = this.props;

    return (
      <ProgressiveImage src={(album || {}).cover} placeholder="http://placehold.it/320?text=Album Cover">
        {src => <img src={src} alt={`${(album || {}).name} cover`} className="AlbumCover" {...props} />}
      </ProgressiveImage>
    );
  }
}
