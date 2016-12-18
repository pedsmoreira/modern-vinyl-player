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
  name

  /**
   * @type {string}
   */
  slug

  /**
   * @type {string}
   */
  cover

  /**
   * Get albums promise
   * @return {Promise}
   */
  albums() {
    return this.hasMany(Album)
  }

  /**
   * Get artist promise by slug
   * @param value
   * @return {Promise}
   */
  static bySlug(value) {
    return this.where('slug', value, {url: value})
  }

  /**
   * Artist promise for a given album
   * @return {Promise}
   */
  static byAlbum(albumId) {
    return this.hasOne(Album, albumId)
  }
}
