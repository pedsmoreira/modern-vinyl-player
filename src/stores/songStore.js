import {observable} from 'mobx'
import RestfulStore from "./RestfulStore";

@observable
class SongStore extends RestfulStore {
}

const songStore = new SongStore()
export default songStore
