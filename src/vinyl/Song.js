import Album from './Album'
import Model from './Model'

export const srcTypes = {
  local: 'LOCAL',
  soundcloud: 'SOUNDCLOUD',
}


export default class Song extends Model {
  /**
   * @type {string}
   */
  src = 'https://soundcloud.com/joao-oliveira-61/someday-the-strokes'

  /**
   * @type {string}
   */
  srcType = srcTypes.soundcloud

  /**
   * @type {string}
   */
  name = 'Song'

  /**
   * @type {Album}
   */
  album = Album.default
}

Song.default = new Song(1)
