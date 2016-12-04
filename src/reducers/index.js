import {combineReducers} from 'redux'

import albumIndexReducer from './albumIndexReducer'
import playerReducer from './playerReducer'
import songsByAlbumReducer from './songsByAlbumReducer'

const rootReducer = combineReducers({
  entities: {},
  player: playerReducer,
  albumIndex: albumIndexReducer,
  songsByAlbumReducer: songsByAlbumReducer
})

export default rootReducer
