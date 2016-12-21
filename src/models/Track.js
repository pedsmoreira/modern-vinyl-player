import {Model} from "premiere";

import Album from "./Album";

export default class Track extends Model {
  static path = 'tracks'

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
  src

  /**
   * @type {string}
   */
  name

  /**
   * @type {number}
   */
  number

  /**
   * Get album promise
   * @return {Promise}
   */
  album() {
    return this.belongsTo(Album)
  }

  /**
   * Get tracks by album promise
   * @param value
   * @return {Promise}
   */
  static byAlbum(value) {
    return this.by(Album, value)
  }
}
