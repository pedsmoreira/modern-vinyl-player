import React from "react";
import {observer} from "mobx-react";
import {observable} from "mobx";

import Header from "../components/template/Header";
import Footer from "../components/template/Footer";
import Player from "../components/Player";

import playerStore from "../stores/playerStore";

import "./AppView.scss";

@observer
export default class AppView extends React.Component {
  /**
   * @type Album
   */
  @observable
  album

  componentWillUpdate() {
    if (playerStore.track) {
      playerStore.track.album().then(album => this.album = album)
    }
  }

  render() {
    return (
      <div className="app-view animated fadeIn">
        <Header/>

        <div className="app-view_content">
          {this.props.children}

          <Player track={playerStore.track}
                  album={this.album}
                  playing={playerStore.playing}
                  loading={playerStore.loading}
                  onPlay={playerStore.play.bind(playerStore)}
                  onPause={playerStore.pause.bind(playerStore)}
                  onNext={playerStore.next.bind(playerStore)}
                  hasNext={playerStore.hasNext()}
                  onPrevious={playerStore.previous.bind(playerStore)}
                  hasPrevious={playerStore.hasPrevious()}
                  onLoad={playerStore.loaded.bind(playerStore)}/>
        </div>

        <Footer/>
      </div>
    )
  }
}
