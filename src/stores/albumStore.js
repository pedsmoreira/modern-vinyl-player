import Store from '../prime-rest/Store'

import Album from '../vinyl/Album'

class AlbumStore extends Store {
  /**
   * @inheritDoc
   */
  allowedMethods = ['index']

  /**
   * @inheritDoc
   */
  index() {
    return this.wrapInPromise([Album.default])
  }
}

const albumStore = new AlbumStore()
export default albumStore
