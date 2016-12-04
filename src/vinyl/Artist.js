import Model from './Model'

export default class Artist extends Model {
  /**
   * @type {string}
   */
  cover = 'http://placehold.it/250x250?text=Artist'

  /**
   * @type {string}
   */
  name = 'Artist'
}

Artist.default = new Artist(1)
