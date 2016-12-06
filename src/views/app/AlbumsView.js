import React from 'react'
import {observer} from 'mobx-react'
import {observable} from 'mobx'

import albumStore from '../../stores/albumStore'

import AlbumList from '../../components/album/AlbumList'

@observer
export default class AlbumsView extends React.Component {
  @observable albums

  componentWillMount() {
    albumStore.index().then(data => this.albums = data)
  }

  render() {
    return (
      <div className="animated fadeIn">
        <AlbumList albums={this.albums}/>
      </div>
    )
  }
}
