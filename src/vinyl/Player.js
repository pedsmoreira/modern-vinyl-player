import Playlist from './Playlist'
import Song from './Song'

export default class Player {
  /**
   * @type {Playlist}
   */
  playlist = new Playlist()

  /**
   * @type {Song}
   */
  song = Song.default

  /**
   * Set song
   * @param {Song} song
   */
  set(song) {
    if (this.song === song) return
    this.song = song
  }

  /**
   * Go to next song
   * @returns {null}
   */
  next() {
    this.set(this.playlist.next(this.song))
  }

  /**
   * Go to previous song
   */
  previous() {
    this.set(this.playlist.previous(this.song))
  }
}
