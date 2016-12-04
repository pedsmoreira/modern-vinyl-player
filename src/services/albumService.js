import Service from './Service'

class AlbumService extends Service {
  /**
   * Get list of albums
   * @return {AxiosPromise}
   */
  index() {
    return this.get('album')
  }
}

const albumService = new AlbumService()

export default albumService
