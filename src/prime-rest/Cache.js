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
   * Get object
   * @param object
   * @return {Model}
   */
  getObject(object) {
    if (this.api.useCache) {
      return this.objects[object.key()]
    }
  }

  /**
   * Set object
   * @param {Model} object
   * @return {Model}
   */
  setObject(object) {
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
    let key = typeof value === 'object' ? value.key() : value
    delete this.objects[key]
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
