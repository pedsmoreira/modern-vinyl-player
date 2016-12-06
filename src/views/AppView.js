import React from 'react'
import {observer} from 'mobx-react'

import Header from '../components/template/Header'
import Footer from '../components/template/Footer'
// import Player from '../components/Player'
import PlaylistButton from '../components/playlist/PlaylistButton'

import {Grid, Row, Col} from 'react-bootstrap'

import './AppView.css'

@observer
export default class AppView extends React.Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Header/>

        <Grid>
          <Row>
            <Col sm={4}>
              <PlaylistButton/>

              {/*<Player/>*/}
            </Col>

            <Col sm={8}>{this.props.children}</Col>
          </Row>
        </Grid>

        <Footer/>
      </div>
    )
  }
}
