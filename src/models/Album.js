import Model from '../prime-rest/Model'

import Track from './Track'
import Artist from './Artist'

export default class Album extends Model {
  static table = 'albums'

  /**
   * @inheritDoc
   */
  static storeProperties = {setIndex: true}

  /**
   * @type {number}
   */
  id

  /**
   * @type {string}
   */
  name

  /**
   * @type {string}
   */
  cover

  /**
   * @type {string}
   */
  background

  /**
   * @type {number}
   */
  year = new Date().getFullYear()

  /**
   * @type {string}
   */
  description

  /**
   * Get tracks promise
   * @return {Promise}
   */
  tracks() {
    return this.hasMany(Track)
  }

  /**
   * Get artist promise
   * @return {Promise}
   */
  artist() {
    return this.belongsTo(Artist)
  }

  /**
   * Get album list by artist promise
   * @param value
   * @return {*|Promise}
   */
  static byArtist(value) {
    return this.resolveStore().by(Artist, value)
  }
}
