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
}
