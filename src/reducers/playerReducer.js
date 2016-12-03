import {handleActions} from 'redux-actions'

import Player from '../vinyl/Player'
import * as playerActions from '../actions/playerActions'
import Artist from "../vinyl/Artist";
import Album from "../vinyl/Album";
import Song from "../vinyl/Song";

let initialState = new Player()

let song = new Song()
song.src = '/songs/puzzle.mp3'
song.name = 'Song name'

initialState.set(song, false)
// initialState.setTime(55)

song.album = new Album()
song.album.name = 'Album'

song.album.artist = new Artist()
song.album.artist.name = 'Artist'

const playerReducer = handleActions({
  /**
   * Play song
   * @param {Player} player
   */
  [playerActions.play]: (player) => {
    player.play()
    return player
  },

  /**
   * Pause song
   * @param {Player} player
   * @return {*}
   */
  [playerActions.pause]: (player) => {
    player.pause()
    return player
  },

  /**
   * Set song time
   * @param player
   * @param payload
   */
  [playerActions.setTime]: (player, {payload}) => {
    player.setTime(payload.time)
    return player
  },

  /**
   * Go to next song
   * @param player
   */
  [playerActions.next]: (player) => {
    player.next()
    return player
  },

  /**
   * Go to previous song
   * @param player
   */
  [playerActions.previous]: (player) => {
    player.previous()
    return player
  }
}, initialState)

export default playerReducer
