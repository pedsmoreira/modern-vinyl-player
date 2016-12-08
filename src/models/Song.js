import Model from '../prime-rest/Model'
import Album from './Album'

export default class Song extends Model {
  static table = 'songs'

  /**
   * @type {string}
   */
  src

  /**
   * @type {string}
   */
  name

  /**
   * Get album promise
   * @return {Promise}
   */
  album() {
    return this.belongsTo(Album, this.album_id)
  }

  /**
   * Get songs by album promise
   * @param value
   * @return {Promise}
   */
  static byAlbum(value) {
    return this.resolveStore().by(Album, value)
  }
}
