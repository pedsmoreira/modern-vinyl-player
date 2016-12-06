import Model from '../prime-rest/Model'
import Album from './Album'

export default class Song extends Model {
  /**
   * @type {string}
   */
  src = 'https://soundcloud.com/joao-oliveira-61/someday-the-strokes'

  /**
   * @type {string}
   */
  name = 'Song'

  album() {
    return this.belongsTo(Album)
  }
}

Album.default = new Album(1)
