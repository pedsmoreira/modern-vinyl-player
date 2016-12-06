import Model from "../prime-rest/Model";

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

  songs() {
    return this.hasMany(Song)
  }
}

Album.default = new Album(1)
