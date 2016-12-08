import {observable} from 'mobx'

export class PlayerStore {
  /**
   * @type {Array}
   */
  @observable
  playlist = []

  /**
   * @type {Song}
   */
  @observable
  song

  /**
   * @type {boolean}
   */
  @observable
  autoplay = true

  @observable
  playing = false

  add(song) {
    if (this.playlist.indexOf(song) === -1) {
      this.playlist.push(song)
    }
  }

  set(song) {
    if (Array.isArray(song)) {
      if (song.length) this.song = song[0]
      return this.playlist = song
    }

    this.song = song
    return this.playlist = [song]
  }

  toggle(song) {
    if (this.song === song) {
      if(this.playing) this.pause()
      else this.play()
      return false
    }

    this.set(song)
    return true
  }

  select(song) {
    this.song = song
  }

  next() {
    let index = this.playlist.indexOf(this.song)
    this.song = this.playlist.length < (index + 1) ? this.playlist[index + 1] : null

    if(!this.song) this.playing = false
  }

  play() {
    if(this.song) {
      this.playing = true
    }
  }

  pause() {
    this.playing = false
  }
}

const playerStore = new PlayerStore()
export default playerStore
