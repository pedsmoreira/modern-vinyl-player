import {observable} from 'mobx'

export class PlayerStore {
  /**
   * @type {Array}
   */
  @observable
  playlist = []

  /**
   * @type {Track}
   */
  @observable
  track

  /**
   * @type {boolean}
   */
  @observable
  playing = false

  /**
   * @type {boolean}
   */
  @observable
  loading = false

  add(track) {
    if (this.playlist.indexOf(track) === -1) {
      this.playlist.push(track)
    }
  }

  set(track) {
    if (Array.isArray(track)) {
      if (track.length) this.track = track[0]
      return this.playlist = track
    }

    this.track = track
    return this.playlist = [track]
  }

  toggle(track) {
    if (this.track === track) {
      if (this.playing) this.pause()
      else this.play()
      return false
    }

    this.set(track)
    this.play()

    return true
  }

  select(track) {
    this.track = track
  }

  next() {
    let index = this.playlist.indexOf(this.track)
    this.track = this.playlist.length < (index + 1) ? this.playlist[index + 1] : null

    if (!this.track) this.playing = false
  }

  play() {
    this.playing = true
  }

  pause() {
    this.playing = false
  }
}

const playerStore = new PlayerStore()
export default playerStore
