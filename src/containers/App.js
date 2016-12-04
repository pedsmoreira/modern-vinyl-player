import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as playerActions from '../actions/playerActions'

import Header from '../components/template/Header'
import Footer from '../components/template/Footer'
import Player from '../components/Player'
import PlaylistButton from '../components/playlist/PlaylistButton'

import {Grid, Row, Col} from 'react-bootstrap'

import styles from './App.css'

class App extends React.Component {
  render() {
    return (
      <div className={styles.app}>
        <Header/>

        <Grid>
          <Row>
            <Col sm={4}>
              <PlaylistButton/>

              <Player player={this.props.player}
                      play={this.props.playerActions.play}
                      pause={this.props.playerActions.pause}
                      next={this.props.playerActions.next}
                      previous={this.props.playerActions.previous}
                      setTime={this.props.playerActions.setTime}
              />
            </Col>

            <Col sm={8}>{this.props.children}</Col>
          </Row>
        </Grid>

        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  player: state.player
})

const mapDispatchProps = dispatch => ({
  playerActions: bindActionCreators(playerActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchProps)(App)
