export default class Cache {
  /**
   * @type {Api}
   */
  api

  /**
   * @type {Object}
   */
  objects = {}

  /**
   * @type {Object}
   */
  lists = {}

  /**
   * @type {Object}
   */
  promises = {}

  constructor(api) {
    this.api = api
  }

  /**
   * Get key from value
   * @param value
   * @return {string}
   */
  resolveKey(value) {
    return typeof value === 'object' ? value.key() : value
  }

  /**
   * Get object
   * @param {Model|*} value
   * @return {Model}
   */
  get(value) {
    if (this.api.useCache) {
      return this.objects[this.resolveKey(value)]
    }
  }

  /**
   * Get object by property value
   * @param property
   * @param value
   * @return {*|{ID, TAG, NAME, CLASS}|Promise|T}
   */
  where(property, value) {
    if (this.api.useCache) {
      return Object.values(this.objects).find((object) => {
        return object[property] === value
      })
    }
  }

  /**
   * Set object
   * @param {Model|Model[]} object
   * @param {boolean} clearLists
   * @return {Model|Model[]}
   */
  set(object, clearLists = true) {
    if (Array.isArray(object)) return object.map(it => this.set(it, clearLists))

    if (this.api.useCache) {
      this.objects[object.key()] = object
      if (clearLists) this.lists = {}
    }
    return object
  }

  /**
   * Remove object
   * @param {Model|*} value
   */
  destroyObject(value) {
    delete this.objects[this.resolveKey(value)]
  }

  /**
   * Get list by name
   * @param {string} name
   */
  getList(name) {
    if (this.api.useCache) {
      return this.lists[name]
    }
  }

  /**
   * Set list by name
   * @param {string} name
   * @param {Model[]} list
   * @return {Model[]}
   */
  setList(name, list) {
    if (this.api.useCache) {
      this.lists[name] = list
    }
    return list
  }

  /**
   * Get promise by name
   * @param {string} name
   * @return {Promise}
   */
  getPromise(name) {
    if (this.api.usePromiseCache) {
      return this.promises[name]
    }
  }

  /**
   * Set promise by name
   * @param {string} name
   * @param {Promise} promise
   * @return {Promise}
   */
  setPromise(name, promise) {
    if (this.api.usePromiseCache) {
      return this.promises[name] = promise
    }
    return promise
  }

  /**
   * Destroy promise by name
   * @param {string} name
   */
  destroyPromise(name) {
    delete this.promises[name]
  }
}
