import Playlist from "./Playlist";

export default class Player {
  /**
   * @type {string}
   */
  elementId

  /**
   * @type {Playlist}
   */
  playlist = new Playlist()

  /**
   * @type {Song}
   */
  song

  /**
   * Player constructor
   * @param {string} elementId
   */
  constructor(elementId = 'rootAudio') {
    this.elementId = elementId
  }

  /**
   * Get audio DOM element
   * @returns {HTMLAudioElement}
   */
  element() {
    return document.getElementById(this.elementId)
  }

  /**
   * Play song
   */
  play() {
    this.element().play()
  }

  /**
   * Pause song
   */
  pause() {
    this.element().pause()
  }

  /**
   * Set source and load song
   */
  load() {
    this.element().src = this.song.src
    this.element().load()
  }

  /**
   * Set song
   * @param {Song} song
   * @param {boolean} autoplay
   */
  set(song, autoplay = true) {
    if (this.song === song) return

    this.song = song
    this.load()

    if (autoplay) this.play()
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

  /**
   * Get current audio time
   * @returns {number}
   */
  currentTime() {
    return this.element().currentTime;
  }

  /**
   * Get audio duration
   * @returns {number}
   */
  duration() {
    return this.element().duration;
  }

  /**
   * Set audio time
   * @param time
   */
  setTime(time) {
    this.element().currentTime = time
  }

  /**
   * Get progress percentage
   * @return {number}
   */
  progress() {
    return Math.floor(this.currentTime() * 100 / this.duration())
  }
}
