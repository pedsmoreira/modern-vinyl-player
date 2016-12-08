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
   * Cache promise by name, so it doesn't get executed again before the result comes back
   * @param name
   * @param promise
   * @return {Promise}
   */
  cachePromise(name, promise) {
    let cached = this.cache.getPromise(name)
    if (cached) return cached

    this.cache.setPromise(name, promise)

    let fn = () => {
      this.cache.destroyPromise(name)
    }
    promise.then(fn, fn)

    return promise
  }

  /**
   * Shortcut for verifying method permission and caching promise
   * @param {string} name
   * @param {Promise} promise
   * @return {Promise}
   */
  verifyAndCache(name, promise) {
    this.verifyPermission(name.split('/')[0])
    return this.cachePromise(name, promise)
  }

  /**
   * Resolve key
   * @param {*} value
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
  normalizedModelInstance(values) {
    let instance = this.modelInstance(values)
    instance.normalize()
    return instance
  }

  /**
   * Get normalized model instance list
   * @param list
   * @return {Model[]}
   */
  normalizedModelList(list) {
    return list.map(object => this.normalizedModelInstance(object))
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
   * Get index
   * @param {boolean} ignoreCache
   * @return {Promise}
   */
  index(ignoreCache = false) {
    return this.verifyAndCache('index', new Promise((resolve, reject) => {
      let list = this.cache.getList('index')
      if (!ignoreCache && list) {
        if (list) return resolve(list)
      }

      let promise = this.http().get('')
      promise.then(response => {
        let list = this.normalizedModelList(response.data)
        this.cache.setList('index', list)
        if (this.setIndex) this.cache.set(list, false)

        resolve(list)
      }, reject)
    }))
  }

  /**
   * Make http get request
   * @param {string|number} key
   * @param {boolean} ignoreCache
   * @return {Promise}
   */
  get(key, ignoreCache = false) {
    return this.verifyAndCache(`get/${key}`, new Promise((resolve, reject) => {
      key = this.resolveKey(key)

      if (!ignoreCache) {
        let object = this.cache.get(key)
        if (object) return resolve(object)
      }

      let promise = this.http().get(key.toString())
      promise.then(response => {
        let instance = this.normalizedModelInstance(response.data)
        resolve(this.cache.set(instance, false))
      }, reject)
    }))
  }

  /**
   * Make http post request
   * @param {Object} data
   * @return {Promise}
   */
  create(data) {
    this.verifyPermission('create')

    let promise = this.http().post('', data)

    return new Promise((resolve, reject) => {
      promise.then((response) => {
        let instance = this.normalizedModelInstance(response.data)
        resolve(this.cache.set(instance))
      }, reject)
    })
  }

  /**
   * Make http put request
   * @param {Object} data
   * @return {Promise}
   */
  update(data) {
    this.verifyPermission('update')

    let promise = this.http().put(data[this.key], data)

    return new Promise((resolve, reject) => {
      promise.then((response) => {
        let instance = this.normalizedModelInstance(response.data)
        resolve(this.cache.set(instance))
      }, reject)
    })
  }

  /**
   * Make http request to destroy model
   * @param {*} value
   * @return {Promise}
   */
  destroy(value) {
    this.verifyPermission('delete')

    let id = this.resolveKey(value)
    let promise = this.http().delete(id)

    promise.then(() => this.cache.destroyObject(id))

    return promise
  }

  /**
   * Make http request to fetch instances by foreign key
   * @param {Model|Function} model
   * @param {*} value
   * @param {boolean} ignoreCache
   * @return {Promise}
   */
  by(model, value = null, ignoreCache = false) {
    if (typeof model === 'object') {
      value = model.key()
      model = model.constructor
    }

    let url = `by${model.singularCapitalizedName()}/${value}`

    return this.cachePromise(url, new Promise((resolve, reject) => {
      let list = this.cache.getList(url)
      if (!ignoreCache && list) {
        return resolve(list)
      }

      let promise = this.http().get(url)
      promise.then(response => {
        let list = this.normalizedModelList(response.data)
        resolve(this.cache.setList(url, list))
      }, reject)
    }));
  }
}
