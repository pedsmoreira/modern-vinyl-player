import {Model} from "premiere";

import Track from "./Track";
import Artist from "./Artist";

export default class Album extends Model {
    static path = 'albums'

    /**
     * @inheritDoc
     */
    static storeProperties = {setIndex: true}

    /**
     * @type {number}
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
     * @type {string}
     */
    background

    /**
     * @type {number}
     */
    year = new Date().getFullYear()

    /**
     * @type {string}
     */
    description

    /**
     * Get tracks promise
     * @return {Promise}
     */
    tracks() {
        return this.hasMany(Track)
    }

    /**
     * Get tracks promise
     * @return {Promise}
     */
    static tracks(albumId) {
        return this.hasMany(Track, albumId)
    }

    /**
     * Get artist promise
     * @return {Promise}
     */
    artist() {
        return this.belongsTo(Artist)
    }

    /**
     * Artist promise for a given album
     * @return {Promise}
     */
    static artist(albumId) {
        return this.hasOne(Artist, albumId);
    }

    /**
     * Get album promise by slug
     * @param value
     * @return {*}
     */
    static bySlug(value) {
        return this.where('slug', value, {url: value})
    }
}
