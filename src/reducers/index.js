import {combineReducers} from 'redux'

import playerReducer from './playerReducer'

const rootReducer = combineReducers({
  player: playerReducer
})

export default rootReducer
