import Api from './Api'

export default class Store extends Api {
  /**
   * @type {Function}
   */
  model

  /**
   * @type {String[]}
   */
  allows = []

  /**
   * @type {String[]}
   */
  denies = []

  /**
   * @type {boolean}
   */
  setIndex = false

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
    return this.model.table
  }

  /**
   * Check if method is allowed
   * @param {string} method
   * @return {boolean}
   */
  isMethodAllowed(method) {
    if (this.denies.indexOf(method) !== -1) return false
    return !this.allows.length || this.allows.indexOf(method) !== -1
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
    this.verifyPermission('index')

    return new Promise((resolve, reject) => {
      let list = this.cache.getList('index')
      if (ignoreCache || !list) {
        if (list) return this.wrapInPromise(list)
      }

      let promise = this.http().get('')
      promise.then(response => {
        let list = this.normalizedModelList(response.data)
        this.cache.setList('index', list)
        resolve(this.cache.set(list))
      }, reject)
    })
  }

  /**
   * Make http get request
   * @param {string|number} key
   * @param {boolean} ignoreCache
   * @return {Promise}
   */
  get(key, ignoreCache = false) {
    this.verifyPermission('get')

    return new Promise((resolve, reject) => {
      key = this.resolveKey(key)

      if (!ignoreCache) {
        let object = this.cache.get(key)
        if (object) return resolve(object)
      }

      let promise = this.http().get(key)
      promise.then(response => {
        let instance = this.normalizedModelInstance(response.data)
        resolve(this.cache.set(instance))
      }, reject)
    })
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
   * @param {Function} model
   * @return {Promise}
   */
  by(model) {
    /**
     * @type {Store}
     */
    let store = model.store
    let foreignKey = `${model.underscorePath()}_${model.keyColumn}`

    let promise = store.http().get(`by${model.name}/${this[foreignKey]}`)
    promise.then(response => this.cache.setList(`by${this.model.table}`, response.data))

    return promise
  }
}
