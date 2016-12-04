import {createAction} from 'redux-actions'
import songService from '../services/songService'

export const byAlbum = createAction('Song.BY_ALBUM', (albumId) => {
  return songService.byAlbum(albumId)
})
