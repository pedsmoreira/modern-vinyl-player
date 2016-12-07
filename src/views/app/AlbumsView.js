import React from 'react'
import {observer} from 'mobx-react'
import {observable} from 'mobx'

import Album from '../../models/Album'

import AlbumList from '../../components/album/AlbumList'

@observer
export default class AlbumsView extends React.Component {
  @observable albums

  componentWillMount() {
    Album.all().then(albums => this.albums = albums)
  }

  render() {
    return (
      <div className="animated fadeIn">
        <AlbumList albums={this.albums}/>
      </div>
    )
  }
}
