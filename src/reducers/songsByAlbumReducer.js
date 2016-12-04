import {handleActions} from 'redux-actions'

import * as songActions from '../actions/songActions'
// import songService from '../services/songService'
import Song from '../vinyl/Song'

let initialState = {}

const songsByAlbumReducer = handleActions({
  /**
   * Get a list of songs by album
   * @param state
   * @param payload
   * @returns {*}
   */
  [songActions.byAlbum]: (state, {payload}) => {
    let album = payload.album
    if (state[album] && (state[album].requested)) return state

    return {...state, [album]: {songs: [Song.default]}} // Stub
    // return songService.byAlbum(payload.album)
  }
}, initialState)

export default songsByAlbumReducer
