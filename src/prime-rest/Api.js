import Cache from './Cache'
import axios from 'axios'

export default class Api {
  static base = ''
  static path = ''
  static headers = {}

  /**
   * @type {boolean}
   */
  useCache = true

  /**
   * @type {boolean}
   */
  usePromiseCache = true

  /**
   * @type {Cache}
   */
  cache = new Cache(this)

  /**
   * API constructor
   * @param {object} properties
   */
  constructor(properties = {}) {
    Object.assign(this, properties)
  }

  /**
   * Get base path
   * @type {string}
   */
  base() {
    return this.constructor.base
  }

  /**
   * Get path for store
   * @type {string}
   */
  path() {
    return this.constructor.path
  }

  /**
   * Get request headers
   * @return {{}}
   */
  headers() {
    return this.constructor.headers
  }

  /**
   * Get http requester
   * @return {axios}
   */
  http() {
    return axios.create({
      baseURL: this.baseUrl(),
      headers: this.headers()
    });
  }

  /**
   *
   * @param token
   */
  static setJwtToken(token) {
    this.headers.Authorization = `Bearer ${token}`
  }

  static removeJwtToken() {
    delete this.headers.Authorization
  }

  /**
   * Get base url
   * @returns {string}
   */
  baseUrl() {
    let base = this.base()
    if (!base.endsWith('/')) base += '/'

    let path = this.path()
    if (!path.endsWith('/')) path += '/'

    return base + path
  }

  /**
   * Cache promise by name, so it doesn't get executed again before the result comes back
   * @param {string} name
   * @param {Function} fn
   * @return {Promise}
   */
  cachePromise(name, fn) {
    if(!this.usePromiseCache) {
      return new Promise(fn)
    }

    let cached = this.cache.getPromise(name)
    if(cached) {
      return cached;
    }

    let promise = new Promise(fn)
    this.cache.setPromise(name, promise)

    let destroyCallback = () => {
      this.cache.destroyPromise(name)
    }
    promise.then(destroyCallback, destroyCallback)

    return promise
  }
}

const api = new Api()
export {api}
