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
   * @type {Cache}
   */
  cache = new Cache(this)

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
}

const api = new Api()
export {api}
