import * as React from "react";
import {observer} from "mobx-react";

import {Grid} from "react-bootstrap";

import PlayerDisc from "./player/PlayerDisc";
import PlayerDescription from "./player/PlayerDescription";
import PlayerControl from "./player/PlayerControl";
import PlayerAudio from "./player/PlayerAudio";

import "./Player.scss";

@observer
export default class Player extends React.Component {
  render() {
    return (
      <div className="player">
        <Grid style={{position: 'relative'}}>
          <PlayerDisc album={this.props.album} playing={this.props.playing && !this.props.loading}/>

          <PlayerDescription album={this.props.album}
                             track={this.props.track}/>

          {!this.props.track ? null :
            <PlayerControl playing={this.props.playing}
                           loading={this.props.loading}
                           onPlay={this.props.onPlay}
                           onPause={this.props.onPause}/>
          }

          <PlayerAudio track={this.props.track}
                       autoplay={this.props.autoplay}
                       playing={this.props.playing}
                       onPlay={this.props.onPlay}
                       onPause={this.props.onPause}
                       onEnd={this.props.onEnd}/>
        </Grid>
      </div>
    )
  }
}
