import * as React from "react";

import {Image} from "react-bootstrap";

import image from "../../images/vinyl_small.png";
import "./PlayerDisc.scss";

export default class PlayerDisc extends React.Component {
  render() {
    let classes = ['player-disc']
    if (this.props.playing) classes.push('player-disc-playing')

    return (
      <div className={classes.join(' ')}>
        <Image className="player-disc_vinyl" src={image} responsive/>
        {!this.props.album ? null :
          <Image className="player-disc_album" src={this.props.album.cover} circle responsive/>
        }
      </div>
    )
  }
}
