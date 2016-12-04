import Service from './Service'

class SongService extends Service {
  /**
   * Get list of songs by album
   * @param album
   * @return {AxiosPromise}
   */
  byAlbum(album) {
    return this.get('song/byAlbum/' + album)
  }
}

const songService = new SongService()

export default songService
