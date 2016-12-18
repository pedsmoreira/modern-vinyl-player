import Store from './Store'

export default class Model {
  static name
  static table

  /**
   * @type {Store}
   */
  static store = null

  /**
   * @type {string}
   */
  static keyColumn = 'id'

  /**
   * @type {Object}
   */
  static storeProperties = {}

  /**
   * Get model store
   * @return {Store}
   */
  store() {
    return this.constructor.resolveStore()
  }

  /**
   * Get value of primary key
   * @return {*}
   */
  key() {
    return this[this.constructor.keyColumn]
  }

  /**
   * Set key value to model
   * @param value
   */
  setKey(value) {
    this[this.constructor.keyColumn] = value
  }

  /**
   * Get mapped properties with values of model
   * The shallow map does not contain objects (consequently, does not contain FKs)
   * @return {{}}
   */
  shallowMap() {
    let map = {}
    Object.keys(this).forEach(key => {
      if (typeof this[key] !== 'object')
        map[key] = this[key]
    })

    return map
  }

  /**
   * Get shallow map merged with denormalized values
   * @return {{}}
   */
  persistentMap() {
    return Object.assign(this.shallowMap(), this.denormalized())
  }

  /**
   * Get foreign key name for a given model and options
   * @param {Function} model
   * @param {Object} options
   * @return {*|string}
   */
  foreignKey(model, options = {}) {
    return `${model.singularUnderscoredName()}_${options.fk || model.keyColumn}`
  }

  /**
   * Set values to instance
   * @param values
   * @return {Model}
   */
  set(values) {
    Object.keys(values).forEach(key => {
      this[key] = values[key]
    })

    return this
  }

  /**
   * Duplicate model
   * @return {Model}
   */
  duplicate() {
    let map = this.shallowMap()
    delete map[this.constructor.keyColumn]

    return this.constructor.make(map)
  }

  /**
   * Create one or an array of model instances
   * @param {Object} values
   * @return {Model|Model[]}
   */
  static make(values) {
    if (Array.isArray(values)) return values.map(it => this.make(it))
    return new this().set(values)
  }

  /**
   * Normalize model
   * This method should filled by model extensions
   * @param data
   */
  normalize(data) {
  }

  /**
   * Get array with denormalized properties
   * This method should be filled by model exteions
   * @return {{}}
   */
  denormalized() {
    return {}
  }

  /**
   * Reload model instance
   * @return {Promise}
   */
  reload() {
    return this.constructor.find(this.key())
  }

  /**
   * Find model object by id
   * @param {*} key
   * @param {Object} options
   * @return {Promise}
   */
  static find(key, options = undefined) {
    return this.resolveStore().get(key, options)
  }

  /**
   * Persist model
   * @param options
   * @return {Promise}
   */
  save(options = undefined) {
    return this.constructor.save(this.persistentMap(), options)
  }

  /**
   * Create and persist one or more instances
   * @param {Object|Object[]} values
   * @param {Object} options
   * @return {Promise|Promise[]}
   */
  static save(values, options = undefined) {
    if (Array.isArray(values)) return values.map(it => this.save(it))

    let method = values[this.keyColumn] ? 'update' : 'create'
    return this.resolveStore()[method](values, options)
  }

  /**
   * Destroy model
   * @param {Object} options
   * @return {Promise}
   */
  destroy(options = undefined) {
    return this.constructor.destroy(this.key(), options)
  }

  /**
   * Destroy
   * @param {*|Array} key
   * @param {Object} options
   * @return {Promise|Promise[]}
   */
  static destroy(key, options = undefined) {
    if (Array.isArray(key)) return key.map(it => this.destroy(it))
    return this.resolveStore().destroy(key, options)
  }

  /**
   * Get promise to belongsTo FK relation
   * @param {Function} model
   * @param {Object} options
   * @return {Promise}
   */
  belongsTo(model, options = {}) {
    return this.constructor.belongsTo(model, this, options)
  }

  /**
   * Get promise to belongsTo FK relation
   * @param {Function} model
   * @param {Model} instance
   * @param {Object} options
   * @return {Promise}
   */
  static belongsTo(model, instance, options = {}) {
    return model.find(instance[instance.foreignKey(model, options)])
  }

  /**
   * Get promise to belongsToMany FK relation
   * @param {Function} model
   * @param {Object} options
   * @return {Promise}
   */
  belongsToMany(model, options = {}) {
    return this.constructor.belongsToMany(model, this, options)
  }

  /**
   * Get promise to belongsToMany FK relation
   * @param model
   * @param instance
   * @param options
   * @return {Promise}
   */
  static belongsToMany(model, instance, options = {}) {
    return this.hasMany(model, instance, options)
  }

  /**
   * Get promise to hasOne FK relation
   * @param {Function} model
   * @return {Promise}
   */
  hasOne(model) {
    return this.constructor.hasOne(model, this.key())
  }

  /**
   * Get promise to hasOne FK relation statically
   * @param {Function} model
   * @param {*} value
   * @param {Object} options
   * @return {Promise}
   */
  static hasOne(model, value, options = {}) {
    return this.resolveStore().by(model, value, options)
  }

  /**
   * Get promise to hasMany FK relation
   * @param {Function} model
   * @param {Object} options
   * @return {Promise}
   */
  hasMany(model, options = {}) {
    return this.constructor.hasMany(model, this, options)
  }

  /**
   * Get promise to hasMany FK relation statically
   * @param {Function} model
   * @param {Model} instance
   * @param {Object} options
   * @return {Promise}
   */
  static hasMany(model, instance, options) {
    return model.resolveStore().by(instance, null, options)
  }

  /**
   * Call action for model
   * @param {string} action
   * @param {Object} options
   * @return {Promise}
   */
  act(action, options = undefined) {
    return this.constructor.act(this.key(), action, options)
  }

  /**
   * Call action
   * @param {*} key
   * @param {string} action
   * @param {Object} options
   * @return {*}
   */
  static act(key, action, options = undefined) {
    return this.resolveStore().act(key, action, options)
  }

  /**
   * Find model object by property value
   * @param {string} property
   * @param {*} value
   * @param {Object} options
   * @return {Promise}
   */
  static where(property, value, options = undefined) {
    return this.resolveStore().where(property, value, options)
  }

  /**
   * Get list of stores
   * @return {Promise}
   */
  static all() {
    return this.resolveStore().index()
  }

  /**
   * Make http request to fetch instances by foreign key
   * @param model
   * @param value
   * @param options
   * @return {Promise}
   */
  static by(model, value = undefined, options = undefined) {
    return this.resolveStore().by(model, value, options)
  }

  /**
   * Get an instance of store
   * @param {Object} properties
   * @param {Function} modelClass
   * @return {Store}
   */
  static resolveStore(properties = this.storeProperties, modelClass = this) {
    return this.store = this.store || new Store(modelClass, properties)
  }

  /**
   * Get singular table name
   * @return {string}
   */
  static singularName() {
    return this.name || this.table.substring(0, this.table.length - 1)
  }

  /**
   * Get capitalized singular table name
   * @return {string}
   */
  static singularCapitalizedName() {
    let name = this.singularName()
    return name.substring(0, 1).toUpperCase() + name.substring(1)
  }

  /**
   * Get path to model in unerscore case
   * @return {string}
   */
  static singularUnderscoredName() {
    return this.singularName().replace(/\.?([A-Z])/g, function (x, y) {
      return "_" + y.toLowerCase()
    }).replace(/^_/, "");
  }

  /**
   * Save instance to local storage
   */
  saveToLocalStorage() {
    this.constructor.saveToLocalStorage(this.persistentMap())
  }

  /**
   * Get key to local storage object
   * @param {*} value
   * @return {string}
   */
  static keyToLocalStorage(value) {
    return `model/${this.table}/${value}`
  }

  /**
   * Save values to local storage
   * @param {Object|Object[]} object
   */
  static saveToLocalStorage(object) {
    if (Array.isArray(object)) object.forEach((it) => this.saveToLocalStorage(it))

    let key = this.keyToLocalStorage(object[this.keyColumn])
    localStorage.setItem(key, JSON.stringify(object))
  }

  /**
   * Fetch instance from local storage
   * @param {*} value
   * @return {Model}
   */
  static fromLocalStorage(value) {
    let key = this.keyToLocalStorage(value)
    return this.make(localStorage.getItem(key))
  }
}
