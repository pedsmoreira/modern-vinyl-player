import * as React from "react";
import {observer} from "mobx-react";

import {Grid} from "react-bootstrap";

import PlayerDescription from "./player/PlayerDescription";
import PlayerControl from "./player/PlayerControl";
import PlayerPrevious from "./player/PlayerPrevious";
import PlayerNext from "./player/PlayerNext";
import PlayerAudio from "./player/PlayerAudio";

import "./Player.scss";

@observer
export default class Player extends React.Component {
  render() {
    return (
      <div className="player">
        <div className="player_content">
          <Grid className="player_grid">
            <PlayerDescription album={this.props.album}
                               track={this.props.track}/>

            <div className="player_controls">
              <PlayerPrevious onPrevious={this.props.onPrevious} hasPrevious={this.props.hasPrevious}/>

              {!this.props.track ? null :
                <PlayerControl playing={this.props.playing}
                               loading={this.props.loading}
                               onPlay={this.props.onPlay}
                               onPause={this.props.onPause}/>
              }

              <PlayerNext onNext={this.props.onNext} hasNext={this.props.hasNext}/>
            </div>
          </Grid>
        </div>

        <PlayerAudio track={this.props.track}
                     playing={this.props.playing}
                     onEnd={this.props.onNext}
                     onLoad={this.props.onLoad}/>
      </div>
    )
  }
}
