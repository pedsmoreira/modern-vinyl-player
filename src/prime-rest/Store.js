import Api from './Api'

export default class Store extends Api {
  /**
   * @type {Function}
   */
  model

  /**
   * @type {String[]}
   */
  allows

  /**
   * @type {String[]}
   */
  denies

  /**
   * @type {boolean}
   */
  setIndex

  /**
   * Store constructor
   * @param {Function} model
   * @param {{}} properties
   */
  constructor(model, properties = {}) {
    super({...properties, model})
  }

  /**
   * @inheritDoc
   */
  path() {
    return this.model.table
  }

  /**
   * Check if method is allowed
   * @param {string} method
   * @return {boolean}
   */
  isMethodAllowed(method) {
    if (this.denies && this.denies.indexOf(method) !== -1) return false
    return !this.allows || this.allows.indexOf(method) !== -1
  }

  /**
   * Verify if a method can be executed. If it can't, throw an error
   * @param {string} method
   * @throws Error
   */
  verifyPermission(method) {
    if (!this.isMethodAllowed(method))
      throw new Error(`Method '${method}' is not allowed in ${this.constructor.table}`)
  }

  /**
   * Shortcut for verifying method permission and caching promise
   * @param {string} name
   * @param {Function} fn
   * @return {Promise}
   */
  verifyAndCache(name, fn) {
    this.verifyPermission(name.split('/')[0])
    return this.cachePromise(name, fn)
  }

  /**
   * Resolve key
   * @param {Model|*} value
   * @return {*}
   */
  resolveKey(value) {
    return typeof value === 'object' ? value.key() : value
  }

  /**
   * Get new model instance
   * @param {{}} values
   * @return {Model}
   */
  modelInstance(values) {
    return this.model.make(values)
  }

  /**
   * Get new normalized model instance
   * @param {{}} values
   * @return {Model}
   */
  normalizedModel(values) {
    if (Array.isArray(values)) return values.map(object => this.normalizedModel(object))

    let instance = this.modelInstance(values)
    instance.normalize()
    return instance
  }

  /**
   * Get index
   * @param {{url, ignoreCache}} options
   * @return {Promise}
   */
  index(options = {}) {
    return this.verifyAndCache('index', (resolve, reject) => {
      let list = this.cache.getList('index')
      if (!options.ignoreCache && list) {
        if (list) return resolve(list)
      }

      let promise = this.http().get(options.url || '')
      promise.then(response => {
        let list = this.normalizedModel(response.data)
        this.cache.setList('index', list)
        if (this.setIndex) this.cache.set(list, false)

        resolve(list)
      }, reject)
    })
  }

  /**
   * Make http get request
   * @param {string|number} key
   * @param {{url,ignoreCache}} options
   * @return {Promise}
   */
  get(key, options = {}) {
    return this.verifyAndCache(`get/${key}`, (resolve, reject) => {
      key = this.resolveKey(key)

      if (!options.ignoreCache) {
        let object = this.cache.get(key)
        if (object) return resolve(object)
      }

      let promise = this.http().get(options.url || key.toString())
      promise.then(response => {
        let instance = this.normalizedModel(response.data)
        resolve(this.cache.set(instance, false))
      }, reject)
    })
  }

  /**
   * Make http get request to fetch by property
   * @param {string} property
   * @param {*} value
   * @param {{url,ignoreCache}} options
   * @return {Promise}
   */
  where(property, value, options = {}) {
    return this.verifyAndCache(`where/${property}/${value}`, (resolve, reject) => {
      if (!options.ignoreCache) {
        let object = this.cache.where(property, value)
        if (object) return resolve(object)
      }

      let url = options.url
      if (!url) {
        let name = property.split('_').map((str) => str.substring(0, 1).toUpperCase() + str.substring(1))
        url = `by${name}`
      }
      let promise = this.http().get(url)

      promise.then(response => {
        let instance = this.normalizedModel(response.data)
        resolve(this.cache.set(instance, false))
      }, reject)
    })
  }

  /**
   * Make http post request
   * @param {Object} data
   * @param {{url}} options
   * @return {Promise}
   */
  create(data, options = {}) {
    this.verifyPermission('create')

    let promise = this.http().post(options.url || '', data)

    return new Promise((resolve, reject) => {
      promise.then((response) => {
        let instance = this.normalizedModel(response.data)
        resolve(this.cache.set(instance))
      }, reject)
    })
  }

  /**
   * Make http put request
   * @param {Object} data
   * @param {{url}} options
   * @return {Promise}
   */
  update(data, options = {}) {
    this.verifyPermission('update')

    return new Promise((resolve, reject) => {
      let promise = this.http().put(options.url || data[this.key], data)
      promise.then((response) => {
        let instance = this.normalizedModel(response.data)
        resolve(this.cache.set(instance))
      }, reject)
    })
  }

  /**
   * Make http request to destroy model
   * @param {*} value
   * @param {{url}} options
   * @return {Promise}
   */
  destroy(value, options = {}) {
    this.verifyPermission('delete')

    let id = this.resolveKey(value)
    let promise = this.http().delete(options.url || id)

    promise.then(() => this.cache.destroyObject(id))

    return promise
  }

  /**
   * Make http request to fetch instances by foreign key
   * @param {Model|Function} model
   * @param {*} value
   * @param {{url,set,ignoreCache}} options
   * @return {Promise}
   */
  by(model, value = null, options = {}) {
    if (typeof model === 'object') {
      value = model.key()
      model = model.constructor
    }

    let url = options.url || `${value}/${this.model.table}`

    return this.cachePromise(`by/${url}`, ((resolve, reject) => {
      let list = this.cache.getList(url)
      if (!options.ignoreCache && list) {
        return resolve(list)
      }

      let promise = model.resolveStore().http().get(url)
      promise.then(response => {
        let list = this.normalizedModel(response.data)
        this.cache.setList(url, list)

        if (options.set || (!Array.isArray(list) && options.set !== false)) {
          this.cache.set(list, false)
        }

        resolve(list)
      }, reject)
    }));
  }

  /**
   * Make http to act
   * @param {*} key
   * @param {string} action
   * @param {{url,data,method}} options
   */
  act(key, action, options = {}) {
    let url = options.url || `${key}/${action}`
    return this.http()[options.method || 'put'](url, options.data || {})
  }
}
