import React from "react";
import {observer} from "mobx-react";
import {observable} from "mobx";

import {browserHistory} from "react-router";
import {Grid, Row, Col} from "react-bootstrap";

import Background from "../../components/Background"
import AlbumName from "../../components/album/AlbumName";
import AlbumCover from "../../components/album/AlbumCover";
import AlbumDescription from "../../components/album/AlbumDescription";
import ArtistName from "../../components/artist/ArtistName";
import ArtistCover from "../../components/artist/ArtistCover";
import ArtistDescription from "../../components/artist/ArtistDescription";
import PlayerPrevious from "../../components/player/PlayerPrevious";
import PlayerControl from "../../components/player/PlayerControl";
import PlayerNext from "../../components/player/PlayerNext";

import playerStore from "../../stores/playerStore";

import "./PlayerView.scss";
import Album from "../../models/Album";

@observer
export default class PlayerView extends React.Component {
    /**
     * @type Album
     */
    @observable
    album

    /**
     * @type Artist
     */
    @observable
    artist

    fetch() {
        playerStore.track.album().then(album => this.album = album)
        Album.artist(playerStore.track.album_id).then(artist => this.artist = artist)
    }

    componentWillMount() {
        if (!playerStore.track) {
            browserHistory.push('/')
        } else {
            this.fetch()
        }
    }

    componentWillUpdate() {
        if ((this.album || {}).id !== playerStore.track.album_id) {
            this.album = null
            this.artist = null
            this.fetch()
        }
    }

    render() {
        if (!playerStore.track) return null

        return (
            <div className="player-view animated fadeIn">
                <Background image={(this.album || {}).background}/>

                <Grid>
                    <Row>
                        <Col md={4} sm={5}>
                            <div className="player-view_player">
                                <AlbumCover album={this.album}/>
                                <div className="player-view_track">{playerStore.track.name}</div>
                                <AlbumName album={this.album}/>
                                <ArtistName artist={this.artist}/>

                                <div className="player-view_controls">
                                    <PlayerPrevious onPrevious={playerStore.previous.bind(playerStore)}
                                                    hasPrevious={playerStore.hasPrevious()}/>

                                    <PlayerControl playing={playerStore.playing}
                                                   loading={playerStore.loading}
                                                   onPlay={playerStore.play.bind(playerStore)}
                                                   onPause={playerStore.pause.bind(playerStore)}/>

                                    <PlayerNext onNext={playerStore.next.bind(playerStore)}
                                                hasNext={playerStore.hasNext()}/>
                                </div>
                            </div>
                        </Col>

                        <Col md={8} sm={7} xsHidden>
                            <div className="player-view_artist clearfix">
                                <ArtistCover artist={this.artist}/>
                                <ArtistName artist={this.artist}/>
                                <ArtistDescription artist={this.artist}/>
                            </div>

                            <div className="player-view_album">
                                <AlbumName album={this.album}/>
                                <AlbumDescription album={this.album}/>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}
