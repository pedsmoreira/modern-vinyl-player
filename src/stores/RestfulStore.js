import axios from 'axios'

import {API} from '../urls'

export default class RestfulStoreStore {
  /**
   * @type {string}
   */
  api = API

  /**
   * @type {string}
   */
  model = this.constructor.name.split('Store')[0]

  /**
   * @type {String[]}
   */
  allowedMethods = []

  /**
   * @type {String[]}
   */
  deniedMethods = []

  /**
   * @type {boolean}
   */
  useCache = false

  /**
   * @type {*}
   */
  cache = {
    index: null,
    objects: {}
  }

  /**
   * Resolve key
   * @param {*} value
   * @return {*}
   */
  static resolveKey(value) {
    return typeof value === 'object' ? value.id : value
  }

  /**
   * Wrap result in promise
   * @param {*} value
   */
  wrapInPromise(value) {
    return new Promise((resolve) => {
      resolve(value)
    })
  }

  /**
   * Check if method is allowed
   * @param {string} method
   * @return {boolean}
   */
  isAllowed(method) {
    if (this.deniedMethods.indexOf(method) !== -1) return false
    return !this.allowedMethods.length || this.allowedMethods.indexOf(method) !== -1
  }

  /**
   * Verify if a method can be executed. If it can't, throw an error
   * @param {string} method
   * @throws Error
   */
  verifyPermission(method) {
    if (!this.isAllowed(method))
      throw new Error(`Method '${method}' is not allowed in ${this.constructor.name}`)
  }

  /**
   * Get base url
   * @returns {string}
   */
  url() {
    return (this.api + '/' + this.model + '/').split('//').join('/')
  }

  /**
   * Get index
   * @return {AxiosPromise}
   */
  index() {
    this.verifyPermission('index')

    let promise = axios.get(this.url())

    if (this.cache.index) return this.wrapInPromise(this.cache.index)

    if (this.useCache)
      promise.then((values) => {
        this.cache.index = values
      })

    return promise
  }

  /**
   * Make http get request
   * @param {string|number} value
   * @return {AxiosPromise}
   */
  get(value) {
    this.verifyPermission('get')

    let id = this.constructor.resolveKey(value)

    let object = this.cache.objects[id]
    if (object) return this.wrapInPromise(this.cache.objects[id])

    return axios.get(this.url())
  }

  /**
   * Make http post request
   * @param {Object} data
   * @return {AxiosPromise}
   */
  create(data) {
    this.verifyPermission('create')

    this.cache.index = null

    return axios.post(this.url(), data)
  }

  /**
   * Make http put request
   * @param {Object} data
   * @param {string|number} key
   * @return {AxiosPromise}
   */
  update(data, key = 'id') {
    this.verifyPermission('update')

    this.cache.index = null

    return axios.put(this.url() + data[key], data)
  }

  /**
   * Make http delete request
   * @param {*} value
   * @return {AxiosPromise}
   */
  ['delete'](value) {
    this.verifyPermission('delete')

    let id = this.constructor.resolveKey(value)

    let promise = axios.delete(this.url() + id)

    if (this.useCache)
      promise.then(() => {
        delete this.cache.index[id]
      })

    return promise
  }
}
