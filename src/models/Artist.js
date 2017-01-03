import {Model} from "premiere";

import Album from "./Album";

export default class Artist extends Model {
    static path = 'artists'

    /**
     * @inheritDoc
     */
    static storeProperties = {setIndex: true}

    /**
     * @type {id}
     */
    id

    /**
     * @type {string}
     */
    name

    /**
     * @type {string}
     */
    slug

    /**
     * @type {string}
     */
    cover

    /**
     * Get albums promise
     * @return {Promise}
     */
    albums() {
        return this.hasMany(Album)
    }

    /**
     * Get albums list by artist promise
     * @param value
     * @return {*|Promise}
     */
    static albums(value) {
        return Artist.hasMany(Album, value)
    }

    /**
     * Get artist promise by slug
     * @param value
     * @return {Promise}
     */
    static bySlug(value) {
        return this.where('slug', value, {url: value})
    }
}
