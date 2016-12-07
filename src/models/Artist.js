import Model from '../prime-rest/Model'

export default class Artist extends Model {
  static table = 'artist'

  /**
   * @type {string}
   */
  cover

  /**
   * @type {string}
   */
  name
}
