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
    if (!this.inPlaylist(track)) {
      this.playlist.push(track)
    }

    if (!this.track) {
      this.track = track
    }
  }

  inPlaylist(track) {
    return !!this.playlist.find((it) => it.id === track.id)
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
    this.track = null

    album.tracks().then((tracks) => {
      this.setArray(tracks)
    })
  }

  setArray(tracks) {
    this.playlist = tracks

    if (tracks.indexOf(this.track) === -1) {
      this.track = tracks[0]
    }

    return this.playlist
  }

  hasPrevious() {
    return this.playlist.indexOf(this.track) > 0
  }

  previous() {
    let index = this.playlist.indexOf(this.track)
    this.track = this.playlist[index - 1]
  }

  hasNext() {
    return this.playlist.indexOf(this.track) < (this.playlist.length - 1)
  }

  next() {
    let index = this.playlist.indexOf(this.track)

    if (this.playlist.length > (index + 1)) {
      this.track = this.playlist[index + 1]
    } else {
      this.playing = false
      this.loading = false
    }
  }

  play(value = null, playlist = null) {
    this.playing = true

    if (playlist) {
      this.playlist = playlist
    }

    if (value && value != this.lastValue) {
      this.set(value)
      this.loading = true
      this.lastValue = value
    }
  }

  pause() {
    this.playing = false
  }

  loaded() {
    this.loading = false
  }
}

const playerStore = new PlayerStore()
export default playerStore
