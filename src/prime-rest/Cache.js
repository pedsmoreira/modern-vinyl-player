export default class Cache {
  /**
   * @type {Api}
   */
  api

  /**
   * @type {{}}
   */
  objects = {}

  /**
   *
   * @type {{}}
   */
  lists = {}

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
   * Set object
   * @param {Model|Model[]} object
   * @return {Model|Model[]}
   */
  set(object) {
    if (Array.isArray(object)) return object.map(it => this.set(it))

    if (this.api.useCache) {
      this.objects[object.key()] = object
      this.lists = {}
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
}
