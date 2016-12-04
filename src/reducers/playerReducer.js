import {handleActions} from 'redux-actions'

import Player from '../vinyl/Player'
import * as playerActions from '../actions/playerActions'

let initialState = new Player()

const playerReducer = handleActions({
  /**
   * Play song
   * @param {Player} player
   */
  [playerActions.play]: (player) => {
    // player.play()
    return player
  },

  /**
   * Pause song
   * @param {Player} player
   * @return {*}
   */
  [playerActions.pause]: (player) => {
    // player.pause()
    return player
  },

  /**
   * Set song time
   * @param player
   * @param payload
   */
  [playerActions.setTime]: (player, {payload}) => {
    // player.setTime(payload.time)
    return player
  },

  /**
   * Go to next song
   * @param player
   */
  [playerActions.next]: (player) => {
    // player.next()
    return player
  },

  /**
   * Go to previous song
   * @param player
   */
  [playerActions.previous]: (player) => {
    // player.previous()
    return player
  }
}, initialState)

export default playerReducer
