import { createAction } from 'redux-actions'

export const play = createAction('Player.PLAY')
export const pause = createAction('Player.PAUSE')
export const setTime = createAction('Player.SET_TIME')
export const next = createAction('Player.NEXT')
export const previous = createAction('Player.PREVIOUS')
