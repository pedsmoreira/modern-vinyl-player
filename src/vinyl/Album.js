import Artist from './Artist'
import Model from './Model'

export default class Album extends Model {
  /**
   * @type {string}
   */
  cover = 'http://placehold.it/300x300?album'

  /**
   * @type {string}
   */
  name = 'Album'

  /**
   * @type {number}
   */
  year = new Date().getFullYear()

  /**
   * @type {Artist}
   */
  artist = Artist.default

  /**
   *
   * @type {Song[]}
   */
  songs = []
}

Album.default = new Album(1)
