import Model from '../prime-rest/Model'
import Album from './Album'

export default class Song extends Model {
  static table = 'artist'

  /**
   * @type {string}
   */
  src

  /**
   * @type {string}
   */
  name

  album() {
    return this.belongsTo(Album)
  }
}
