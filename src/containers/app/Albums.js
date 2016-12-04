import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as playerActions from '../../actions/playerActions'
import * as albumActions from '../../actions/albumActions'

import Album from '../../components/album/Album'
import {Row, Col} from 'react-bootstrap'

class Albums extends React.Component {
  componentWillMount() {
    if (!this.props.albums) this.props.albumActions.index()
  }

  render() {
    return (
      <div className="animated fadeIn">
        {this.props.albums ? this.renderAlbums() : this.renderLoader()}
      </div>
    )
  }

  renderAlbums() {
    let albums = this.props.albums.map(album =>
      <Col key={album.id} md={3}>
        <Album album={album}/>
      </Col>
    )

    return (
      <Row>{albums}</Row>
    )
    // return {
    //    {/*<Album album={this.props.albums[0]}/>*/}
    // }
    // return {albums}
  }

  renderLoader() {
    return (
      <div>Loading Albums</div>
    )
  }
}

const mapStateToProps = state => ({
  albums: state.albumIndex.albums
})

const mapDispatchProps = dispatch => ({
  playerActions: bindActionCreators(playerActions, dispatch),
  albumActions: bindActionCreators(albumActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchProps)(Albums)
