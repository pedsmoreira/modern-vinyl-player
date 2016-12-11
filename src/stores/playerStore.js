import {observable} from 'mobx'

import Album from "../models/Album";

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

  set(value) {
    if (value instanceof Album) {
      return this.setAlbum(value)
    }

    if (Array.isArray(value)) {
      return this.setArray(value)
    }

    if (this.playlist.indexOf(value) === -1) {
      this.playlist = [value]
    }

    this.track = value
    return this.playlist
  }

  setAlbum(album) {
    this.loading = true
    album.tracks().then((tracks) => {
      this.setArray(tracks)
      this.loading = false
    })
  }

  setArray(tracks) {
    this.playlist = tracks

    if (tracks.indexOf(this.track) === -1) {
      this.track = tracks[0]
    }

    return this.playlist
  }

  next() {
    let index = this.playlist.indexOf(this.track)
    this.track = this.playlist.length < (index + 1) ? this.playlist[index + 1] : null

    if (!this.track) this.playing = false
  }

  play(value = null) {
    if (value) {
      this.set(value)
    }
    this.playing = true
  }

  pause(value = null) {
    if (value) {
      this.set(value)
    }
    this.playing = false
  }
}

const playerStore = new PlayerStore()
export default playerStore
