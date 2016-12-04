import {handleActions} from 'redux-actions'

import * as albumActions from '../actions/albumActions'
// import albumService from '../services/albumService'
import Album from '../vinyl/Album'

let initialState = {
  albums: null,
  requested: false
}

const albumReducer = handleActions({
  /**
   * Index albums
   * @returns {*}
   */
  [albumActions.index]: (state) => {
    if (state.requested) return state

    return {...state, albums: [Album.default]}
    // return albumService.index()
  }
}, initialState)

export default albumReducer
