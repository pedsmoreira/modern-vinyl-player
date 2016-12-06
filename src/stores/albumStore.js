import RestfulStore from "./RestfulStore";

import Album from '../vinyl/Album'

class AlbumStore extends RestfulStore {
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
