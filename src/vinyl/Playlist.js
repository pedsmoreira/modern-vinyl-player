export default class Playlist {
  /**
   * @type {Song[]}
   */
  songs = []

  /**
   * Get song relative to a give song
   * @param {Song} song
   * @param {number} change
   * @returns {Song}
   */
  relativeTo(song, change) {
    let index = this.songs.indexOf(song)
    let newIndex = index + change
      if (index === -1 || newIndex < 0 || newIndex >= this.songs.length) return null

    return this.songs[newIndex]
  }

  /**
   * Get previous song
   * @param {Song} song
   * @returns {Song}
   */
  previous(song) {
    return this.relativeTo(song, -1)
  }

  /**
   * Get next song
   * @param {Song} song
   * @returns {Song}
   */
  next(song) {
    return this.relativeTo(song, 1)
  }
}
