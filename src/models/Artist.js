import Model from '../prime-rest/Model'

export default class Artist extends Model {
  static table = 'artists'

  /**
   * @type {string}
   */
  cover

  /**
   * @type {string}
   */
  name

  /**
   * Get albums promise
   * @return {Promise}
   */
  albums() {

  }
}
