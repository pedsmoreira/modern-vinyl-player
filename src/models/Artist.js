import Model from "../prime-rest/Model";
import Album from "./Album";

export default class Artist extends Model {
  static table = 'artists'

  /**
   * @inheritDoc
   */
  static storeProperties = {setIndex: true}

  /**
   * @type {id}
   */
  id

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
    return this.hasMany(Album)
  }

  /**
   * Artist promise for a given album
   * @return {Promise}
   */
  static byAlbum(albumId) {
    return this.hasOne(Album, albumId)
  }
}
