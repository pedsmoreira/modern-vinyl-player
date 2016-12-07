import Model from '../prime-rest/Model'

import Song from './Song'
import Artist from './Artist'

export default class Album extends Model {
  /**
   * @inheritDoc
   */
  static storeProperties = {setIndex: true}

  /**
   * @type {string}
   */
  cover

  /**
   * @type {string}
   */
  name

  /**
   * @type {number}
   */
  year = new Date().getFullYear()

  /**
   * Get songs promise
   * @return {Promise}
   */
  songs() {
    return this.hasMany(Song)
  }

  /**
   * Get artist promise
   * @return {Promise}
   */
  artist() {
    return this.belongsTo(Artist)
  }
}
