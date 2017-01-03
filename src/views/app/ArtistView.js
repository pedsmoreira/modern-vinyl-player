import React from 'react'
import {observer} from "mobx-react";
import {observable} from "mobx";

import Artist from "../../models/Artist";

import playerStore from "../../stores/playerStore";

import {Grid, Row, Col} from "react-bootstrap";

import Background from "../../components/Background";
import ArtistCover from "../../components/artist/ArtistCover";
import ArtistName from "../../components/artist/ArtistName";
import ArtistDescription from "../../components/artist/ArtistDescription";
import AlbumList from "../../components/album/AlbumList";

import "./ArtistView.scss";

@observer
export default class ArtistView extends React.Component {
    @observable
    artist

    @observable
    albums

    componentWillMount() {
        let artistSlug = this.props.params.artist

        Artist.bySlug(artistSlug).then(artist => this.artist = artist)
        Artist.albums(artistSlug).then(albums => this.albums = albums)
    }

    render() {
        return (
            <div className="artist-view animated fadeIn">
                <Background image={(this.artist || {}).background}/>

                <Grid>
                    <Row>
                        <Col md={4}>
                            <div className="artist-view_description">
                                <ArtistCover artist={this.artist}/>
                                <ArtistName artist={this.artist}/>
                                <ArtistDescription artist={this.artist}/>
                            </div>
                        </Col>

                        <Col md={8}>
                            <AlbumList albums={this.albums}
                                       track={playerStore.track}
                                       playing={playerStore.playing}
                                       loading={playerStore.loading}
                                       onPlay={playerStore.play.bind(playerStore)}
                                       onPause={playerStore.pause.bind(playerStore)}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}
