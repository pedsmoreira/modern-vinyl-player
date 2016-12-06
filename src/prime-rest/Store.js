import Api from './Api'

export default class Store extends Api {
  /**
   * @type {Function}
   */
  model

  /**
   * @type {String[]}
   */
  allowedMethods = []

  /**
   * @type {String[]}
   */
  deniedMethods = []

  /**
   * Store constructor
   * @param {Function} model
   * @param {{}} properties
   */
  constructor(model, properties = {}) {
    super(properties)
    this.model = model
  }

  /**
   * @inheritDoc
   */
  path() {
    return this.model.path()
  }

  /**
   * Check if method is allowed
   * @param {string} method
   * @return {boolean}
   */
  isMethodAllowed(method) {
    if (this.deniedMethods.indexOf(method) !== -1) return false
    return !this.allowedMethods.length || this.allowedMethods.indexOf(method) !== -1
  }

  /**
   * Verify if a method can be executed. If it can't, throw an error
   * @param {string} method
   * @throws Error
   */
  verifyPermission(method) {
    if (!this.isMethodAllowed(method))
      throw new Error(`Method '${method}' is not allowed in ${this.constructor.name}`)
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
    return this.model.create(values)
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
    this.verifyPermission('index')

    let promise = this.http().get(this.url())

    let list = this.cache.getList('index')
    if (ignoreCache || !list) {
      if (list) return this.wrapInPromise(list)
    }

    promise.then(response => this.cache.setList('index', this.normalizedModelList(response.data)))

    return promise
  }

  /**
   * Make http get request
   * @param {string|number} key
   * @param {boolean} ignoreCache
   * @return {Promise}
   */
  get(key, ignoreCache = false) {
    this.verifyPermission('get')

    key = this.resolveKey(key)

    if (!ignoreCache) {
      let object = this.cache.getObject(key)
      if (object) return this.wrapInPromise(object)
    }

    let promise = this.http().get(this.url(key))

    promise.then(response => this.cache.setObject(this.normalizedModelInstance(response.data)))

    return promise
  }

  /**
   * Make http post request
   * @param {Object} data
   * @return {Promise}
   */
  create(data) {
    this.verifyPermission('create')

    let promise = this.http().post(this.url(), data)

    return new Promise((resolve, reject) => {
      promise.then((response) => {
        resolve(this.cache.setObject(this.normalizedModelInstance(response.data)))
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

    let promise = this.http().put(this.url(data[this.key]), data)

    return new Promise((resolve, reject) => {
      promise.then((response) => {
        resolve(this.cache.setObject(this.normalizedModelInstance(response.data)))
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
    let promise = this.http().delete(this.url(id))

    promise.then(() => this.cache.destroyObject(id))

    return promise
  }

  /**
   * Make http request to fetch instances by foreign key
   * @param {Function} model
   * @return {Promise}
   */
  by(model) {
    /**
     * @type {Store}
     */
    let store = model.store
    let foreignKey = `${model.underscorePath()}_${model.keyColumn}`

    let promise = store.http().get(this.url(`by${model.name}/${this[foreignKey]}`))
    promise.then(response => this.cache.setList(`by${this.model.name}`, response.data))

    return promise
  }
}
